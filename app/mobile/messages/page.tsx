/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import ConversationList from '@/components/ConversationList'
import Header from '@/components/Header'
import { useGetConversations } from '@/hooks/useGetConversations'
import { useIsMobile } from '@/hooks/useIsMobile'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useSocketConnection } from '@/hooks/useSocketConnect'
import { useUserOnline } from '@/providers/onlieUserProvider'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { mobileMessageMotion } from '@/framer-motion'
const MobileMessagePage = () => {
  const { user } = useIsSuccessUser()
  const { socket } = useSocketConnection('new-user-add', user._id)
  const { usersOnlineDispatch } = useUserOnline()
  const { conversations, isPending } = useGetConversations(user._id)
  useEffect(() => {
    socket.on('get-users', (users: any) => {
      usersOnlineDispatch(users)
    })
  }, [])
  useIsSuccessUser()
  return (
    <motion.div
      {...mobileMessageMotion}
      className="dark:bg-secondary bg-light w-full h-full">
      <Header />
      <div className="px-3">
        <ConversationList conversations={conversations} isPending={isPending} />
      </div>
    </motion.div>
  )
}

export default MobileMessagePage
