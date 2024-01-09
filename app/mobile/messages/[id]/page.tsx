'use client'
import ChatBox from '@/components/ChatBox'
import Header from '@/components/Header'
import { useGetSingleConversation } from '@/hooks/useGetSingleConversation'
import { useSocketConnection } from '@/hooks/useSocketConnect'
import { useParams } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'
import { mobilePageMotion } from '@/framer-motion'
const MobileMessages = () => {
  const { id: conversationId } = useParams()
  const { data, isPending } = useGetSingleConversation({ conversationId })
  const { otherUsers } = data?.singleConversation || []
  const { socket } = useSocketConnection('join_room', conversationId)
  return (
    <motion.div
      {...mobilePageMotion}
      className="bg-white dark:bg-secondary h-full w-full pt-20">
      <div className="w-full fixed top-0 z-30 dark:bg-secondary bg-light">
        {!isPending && <Header otherUsers={!isPending && otherUsers[0]} />}
      </div>
      <ChatBox
        conversationId={conversationId}
        socket={socket}
        otherUsers={!isPending && otherUsers[0]}
      />
    </motion.div>
  )
}

export default MobileMessages
