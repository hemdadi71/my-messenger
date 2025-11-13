'use client'
import ChatBox from '@/components/ChatBox'
import Header from '@/components/Header'
import MessagesBox from '@/components/MessagesBox'
import { useGetSingleConversation } from '@/hooks/useGetSingleConversation'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useSocketConnection } from '@/hooks/useSocketConnect'
import { useChat } from '@/providers/chatProvider'

import { useParams, useRouter } from 'next/navigation'

const MessageIdPage = () => {
  const { id: conversationId } = useParams()
  const { data, isPending } = useGetSingleConversation({ conversationId })
  const { otherUsers } = data?.singleConversation || []
  const { socket } = useSocketConnection('join_room', conversationId)
  const { isMobile } = useIsMobile()
  const router = useRouter()
  if (isMobile) {
    router.push(`/mobile/messages/${conversationId}`)
  }

  return (
    <div className="h-full relative">
      <Header otherUsers={!isPending && otherUsers?.[0]} />
      <ChatBox
        conversationId={conversationId}
        socket={socket}
        otherUsers={!isPending && otherUsers?.[0]}
      />
    </div>
  )
}

export default MessageIdPage
