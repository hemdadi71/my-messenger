'use client'

import React, { useEffect, useRef, useState } from 'react'
import MessageForm from './MessageForm'
import MessagesBox from './MessagesBox'
import { animateScroll as scroll, scrollSpy } from 'react-scroll'
import { useGetMessages } from '@/hooks/useGetMessages'
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
  const { messages, isPending } = useGetMessages(conversationId)
  const [chat, setChat] = useState<any>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: 'messagesBox',
      duration: 200,
    })
  }
  useEffect(() => {
    if (!isPending) {
      setChat(messages)
      socket.emit('send_msg', messages)
    }
    scrollToBottom()
  }, [messages, isPending, socket])
  useEffect(() => {
    scrollToBottom()
  }, [chat, isTyping])
  useEffect(() => {
    socket.on('receive_msg', (data: any) => {
      console.log(data)
      setChat(data)
    })
  }, [setChat, socket])
  return (
    <>
      <div className="h-full bg-cover flex flex-col justify-between bg-no-repeat bg-center dark:bg-darkMessage bg-neutral-200">
        <div
          id="messagesBox"
          className="md:h-[79%] 2xl:h-[86%] h-[90%] pb-16 md:pb-2 overflow-y-auto p-3">
          {isPending ? (
            <div className="flex items-center justify-center h-full">
              <Loading width={200} height={40} />
            </div>
          ) : (
            <MessagesBox
              chat={chat}
              socket={socket}
              otherUsers={otherUsers}
              conversationId={conversationId}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
          )}
        </div>
        <div className='sm:pb-20 pb-0'>
          <MessageForm
            conversationId={conversationId}
            socket={socket}
            setChat={setChat}
          />
        </div>
      </div>
    </>
  )
}

export default ChatBox
