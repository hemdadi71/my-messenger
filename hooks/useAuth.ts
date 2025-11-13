import { useUser } from '@/providers/userProvider'
import { login, register } from '@/Services/authService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useIsMobile } from './useIsMobile'
export type VARIANT = 'LOGIN' | 'REGISTER'
export function useAuth() {
  const [variant, setVariant] = useState<VARIANT>('LOGIN')
  const router = useRouter()
  const { userDispatch } = useUser()
  const { isMobile } = useIsMobile()
  const { isPending: isLoading, mutate: authMutate } = useMutation({
    mutationFn: variant === 'LOGIN' ? login : register,
    onSuccess: data => {
      if (data?.user?.firstName) {
        userDispatch(data)
        if (isMobile) router.push('/mobile/messages')
        else router.push('/messages')
      } else {
        if (isMobile) router.push('/mobile/completeProfile')
        else router.push('/completeProfile')
      }
    },
    onError: error => {
      console.log(error)
    },
  })
  return { isLoading, variant, setVariant, authMutate }
}
