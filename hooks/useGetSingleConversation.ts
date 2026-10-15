import {
  getSingleConversation,
  getConversations,
} from '@/Services/conversationService'

import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { FieldValues } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import {
  usePathname,
  useRouter,
} from 'next/navigation'

import { useUser } from '@/providers/userProvider'

export function useGetSingleConversation(
  id: FieldValues
) {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const { user } = useUser()

  const redirectedId = useRef<string | null>(
    null
  )

  const conversationId = Array.isArray(
    id.conversationId
  )
    ? id.conversationId[0]
    : id.conversationId

  const conversationQuery = useQuery({
    queryKey: [
      'get-single-conversation',
      id,
    ],

    queryFn: () =>
      getSingleConversation({
        ...id,
        conversationId,
      }),

    enabled: Boolean(
      conversationId && user?._id
    ),

    // گفتگوی حذف‌شده را دوباره درخواست نکن.
    retry: (count, error: any) =>
      error?.response?.status !== 404 &&
      count < 2,
  })

  // با همان invalidateQueries مربوط به
  // conversations-changed تازه می‌شود.
  const listQuery = useQuery({
    queryKey: [
      'get-conversations',
      user?._id,
      'active-chat',
      conversationId,
    ],

    queryFn: getConversations,

    enabled: Boolean(
      conversationId && user?._id
    ),

    refetchOnMount: 'always',
  })

  const conversationNotFound =
    (conversationQuery.error as any)
      ?.response?.status === 404

  // فقط پاسخ موفق و تازهٔ API معتبر است؛
  // خالی بودن اولیه یا کش قدیمی کافی نیست.
  const removedFromList =
    listQuery.isSuccess &&
    listQuery.isFetchedAfterMount &&
    !listQuery.isFetching &&
    listQuery.data?.success === true &&
    Array.isArray(
      listQuery.data?.conversations
    ) &&
    !listQuery.data.conversations.some(
      (item: any) =>
        String(item.conversationId) ===
        String(conversationId)
    )

  useEffect(() => {
    if (
      !conversationId ||
      (
        !conversationNotFound &&
        !removedFromList
      )
    ) {
      return
    }

    if (
      redirectedId.current === conversationId
    ) {
      return
    }

    redirectedId.current = conversationId

    // درخواست قبلی پیام‌ها متوقف شود.
    void queryClient.cancelQueries({
      queryKey: [
        'get-messages',
        conversationId,
      ],
    })

    // پیام‌های گفتگوی حذف‌شده پاک شوند.
    queryClient.setQueryData(
      ['get-messages', conversationId],
      []
    )

    // صفحهٔ چت بسته و فهرست نمایش داده شود.
    router.replace(
      pathname.startsWith('/mobile')
        ? '/mobile/messages'
        : '/messages'
    )
  }, [
    conversationId,
    conversationNotFound,
    removedFromList,
    pathname,
    queryClient,
    router,
  ])

  return {
    data: conversationQuery.data,
    isPending: conversationQuery.isPending,
  }
}