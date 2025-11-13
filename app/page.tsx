'use client'
import AuthForm from '@/components/Auth/AuthForm'
import Loading from '@/components/Loading'
import { Toggler } from '@/components/Toggler'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function Home() {
  const { user, isLoading, isMobile, pathName, conversationId } =
    useIsSuccessUser() || {}
  const router = useRouter()

  useLayoutEffect(() => {
    if (!user || isLoading) return

    if (!user.firstName || !user.lastName) {
      const path = isMobile ? '/mobile/completeProfile' : '/completeProfile'
      router.replace(path)
      return
    }

    if (isMobile) {
      if (conversationId) {
        router.replace(`/mobile/messages/${conversationId}`)
      } else {
        router.replace('/mobile/messages')
      }
    } else {
      if (conversationId && pathName?.includes('/messages/')) {
        router.replace(`/messages/${conversationId}`)
      } else {
        router.replace('/messages')
      }
    }
  }, [user, isLoading, isMobile, router, conversationId, pathName])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-light dark:bg-secondary">
        <Loading width={100} height={100} />
      </div>
    )
  }
  if (!user) {
    return (
      <div className="dark:bg-secondary bg-light bg-cover h-full overflow-hidden font-poppins">
        <Toggler />
        <AuthForm />
      </div>
    )
  }

  return (
    <div className="h-screen flex items-center justify-center bg-light dark:bg-secondary">
      <p>Moving to page</p>
    </div>
  )
}
