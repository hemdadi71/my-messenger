import { getUsers } from '@/actions/getUsers'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIsMobile } from './useIsMobile'
import { useUser } from '@/providers/userProvider'

export default function useIsSuccessUser() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { userDispatch } = useUser()
  const { isMobile } = useIsMobile()
  const pathName = usePathname()
  const { id } = useParams()

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        setIsLoading(true)
        const { error, user: apiUser } = await getUsers()
        const currentUser = apiUser?.user

        if (!mounted) return

        if (error || !currentUser) {
          setUser(null)
          return
        }

        // Update context
        userDispatch(currentUser)
        setUser(currentUser)
      } catch (err) {
        console.error('Auth check failed:', err)
        if (mounted) setUser(null)
      } finally {
        if (mounted) setIsLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [userDispatch])

  const isSuccess = !isLoading && !!user

  return {
    user,
    isLoading,
    isSuccess, // Now properly returned
    isMobile,
    pathName,
    conversationId: id as string | undefined,
  }
}