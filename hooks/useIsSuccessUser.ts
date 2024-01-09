import { getUsers } from '@/actions/getUsers'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIsMobile } from './useIsMobile'
import { useUser } from '@/providers/userProvider'

export default function useIsSuccessUser() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { userDispatch, user } = useUser()
  const { isMobile } = useIsMobile()
  const router = useRouter()
  const pathName = usePathname()
  const { id } = useParams()
  const isConversationPage = pathName === `/messages/${id}`
  const isMobileConversationPage = pathName === `/mobile/messages/${id}`
  useEffect(() => {
    ;(async () => {
      const { error, user } = await getUsers()
      const currentUser = user?.user
      if (error) return router.push('/')

      userDispatch(currentUser)
      setIsSuccess(true)
      if (isMobile) {
        if (isMobileConversationPage) {
          router.push(`/mobile/messages/${id}`)
        } else {
          router.push('/mobile/messages')
        }
        return
      }
      if (!currentUser?.firstName || !currentUser?.lastName) {
        if (isMobile) {
          return router.push('/mobile/completeProfile')
        } else {
          return router.push('/completeProfile')
        }
      }

      if (isConversationPage) return router.push(`/messages/${id}`)
      // if (!isMobile) return router.push('/messages')
    })()
  }, [
    router,
    id,
    isConversationPage,
    isMobile,
    isMobileConversationPage,
    userDispatch,
  ])
  return { isSuccess, user }
}
