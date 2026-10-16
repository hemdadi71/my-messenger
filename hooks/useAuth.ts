import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useUser } from '@/providers/userProvider'
import {
  login,
  register,
  isLogin,
} from '@/Services/authService'

export type VARIANT = 'LOGIN' | 'REGISTER'

export function useAuth() {
  const [variant, setVariant] =
    useState<VARIANT>('LOGIN')

  const router = useRouter()
  const { userDispatch } = useUser()

  const {
    isPending: isLoading,
    mutate: authMutate,
  } = useMutation({
    mutationFn: async (
      credentials: FieldValues
    ) => {
      const result =
        variant === 'LOGIN'
          ? await login(credentials)
          : await register(credentials)

      // صرف موفق بودن درخواست ورود کافی نیست؛
      // نشست مبتنی بر کوکی نیز بررسی می‌شود.
      try {
        const session = await isLogin()

        if (!session?.user?._id) {
          throw new Error(
            'SESSION_NOT_VALID'
          )
        }

        return {
          ...result,
          user: session.user,
        }
      } catch (error: any) {
        if (
          error?.response?.status === 401
        ) {
          throw new Error(
            'SESSION_NOT_VALID'
          )
        }

        throw error
      }
    },

    onSuccess: data => {
      // فقط خود کاربر، نه کل پاسخ API
      userDispatch(data.user)

      const isMobile =
        !window.matchMedia(
          '(min-width: 640px)'
        ).matches

      const prefix = isMobile
        ? '/mobile'
        : ''

      const destination =
        data.user.firstName &&
        data.user.lastName
          ? '/messages'
          : '/completeProfile'

      toast.success(
        variant === 'LOGIN'
          ? 'ورود موفق بود'
          : 'ثبت‌نام موفق بود'
      )

      router.replace(
        `${prefix}${destination}`
      )
    },

    onError: (error: any) => {
      if (
        error?.message ===
        'SESSION_NOT_VALID'
      ) {
        toast.error(
          'درخواست موفق بود، اما نشست ورود معتبر نیست. کوکی و توکن باید بررسی شوند.'
        )

        return
      }

      const status =
        error?.response?.status

      if (status === 401) {
        toast.error(
          'نام کاربری یا رمز عبور اشتباه است. بزرگی و کوچکی حروف را بررسی کن.'
        )
      } else if (status === 409) {
        toast.error(
          'این نام کاربری قبلاً ثبت شده است؛ از بخش ورود استفاده کن.'
        )
      } else if (status === 400) {
        toast.error(
          'نام کاربری و رمز عبور را بررسی کن.'
        )
      } else if (
        status &&
        status >= 500
      ) {
        toast.error(
          'خطای سرور؛ لاگ درخواست در سرویس میزبانی بررسی شود.'
        )
      } else {
        toast.error(
          'درخواست ورود کامل نشد؛ اتصال اینترنت و آدرس سایت را بررسی کن.'
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