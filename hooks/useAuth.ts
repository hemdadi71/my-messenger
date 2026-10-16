import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useUser } from '@/providers/userProvider'
import { login, register, isLogin } from '@/Services/authService'

export type VARIANT = 'LOGIN' | 'REGISTER'

export function useAuth() {
  const [variant, setVariant] = useState<VARIANT>('LOGIN')

  const router = useRouter()
  const { userDispatch } = useUser()

  const { isPending: isLoading, mutate: authMutate } = useMutation({
    mutationFn: async (credentials: FieldValues) => {
      const result =
        variant === 'LOGIN'
          ? await login(credentials)
          : await register(credentials)

      try {
        const session = await isLogin()

        if (!session?.user?._id) {
          throw new Error('SESSION_NOT_VALID')
        }

        return {
          ...result,
          user: session.user,
        }
      } catch (error: any) {
        if (error?.response?.status === 401) {
          throw new Error('SESSION_NOT_VALID')
        }

        throw error
      }
    },

    onSuccess: data => {
      userDispatch(data.user)

      const isMobile = !window.matchMedia('(min-width: 640px)').matches

      const prefix = isMobile ? '/mobile' : ''

      const destination =
        data.user.firstName && data.user.lastName
          ? '/messages'
          : '/completeProfile'

      toast.success(
        variant === 'LOGIN'
          ? 'Logged in successfully'
          : 'Registered successfully',
      )

      router.replace(`${prefix}${destination}`)
    },

    onError: (error: any) => {
      if (error?.message === 'SESSION_NOT_VALID') {
        toast.error(
          'The request succeeded, but the login session is invalid. Please check the cookies and tokens.',
        )

        return
      }

      const status = error?.response?.status

      if (status === 401) {
        toast.error(
          'Incorrect username or password. Please check capitalization.',
        )
      } else if (status === 409) {
        toast.error('This username is already registered. Please log in.')
      } else if (status === 400) {
        toast.error('Please check your username and password.')
      } else if (status && status >= 500) {
        toast.error(
          'Server error. Please check the logs on your hosting platform.',
        )
      } else {
        toast.error(
          'The login request could not be completed. Please check your internet connection and the website URL.',
        )
      }
    },
  })

  return {
    isLoading,
    variant,
    setVariant,
    authMutate,
  }
}
