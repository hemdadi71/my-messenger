'use client'

import React, {
  useEffect,
  useState,
} from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { useGetMessages } from '@/hooks/useGetMessages'
import MessageForm from './MessageForm'
import MessagesBox from './MessagesBox'
import Loading from './Loading'

interface ChatBoxProps {
  conversationId: any
  socket: any
  otherUsers: any
}

const ChatBox: React.FC<ChatBoxProps> = ({
  conversationId,
  socket,
  otherUsers,
}) => {
  const { messages, isPending } =
    useGetMessages(conversationId)

  const [isTyping, setIsTyping] =
    useState(false)

  const chat = Array.isArray(messages)
    ? messages
    : []

  useEffect(() => {
    setIsTyping(false)
  }, [conversationId])

  useEffect(() => {
    scroll.scrollToBottom({
      containerId: 'messagesBox',
      duration: 200,
    })
  }, [messages, isTyping])

  return (
    <div className="h-full bg-cover flex flex-col justify-between bg-no-repeat bg-center dark:bg-darkMessage bg-neutral-200">
      <div
        id="messagesBox"
        className="md:h-[79%] 2xl:h-[86%] h-[90%] pb-16 md:pb-2 overflow-y-auto p-3"
      >
        {isPending ? (
          <div className="flex items-center justify-center h-full">
            <Loading width={200} height={40} />
          </div>
        ) : (
          <MessagesBox
            key={String(conversationId)}
            chat={chat}
            socket={socket}
            otherUsers={otherUsers}
            conversationId={conversationId}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
        )}
      </div>

      <div className="sm:pb-20 pb-0">
        <MessageForm
          key={String(conversationId)}
          conversationId={conversationId}
          socket={socket}
        />
      </div>
    </div>
  )
}

export default ChatBox