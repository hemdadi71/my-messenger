'use client'
import { useGetConversations } from '@/hooks/useGetConversations'
import React, { useEffect, useState } from 'react'
import ConversationCard from './ConversationCard'
import { AnimatePresence } from 'framer-motion'
import { useUserOnline } from '@/providers/onlieUserProvider'
import AddSomeThing from './AddSomeThing'
import { useRightSidebar } from '@/providers/SidebarProvider'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useUser } from '@/providers/userProvider'
import MobileModal from '@/app/mobile/components/MobileModal'
const ConversationList = ({ conversations, isPending }: any) => {
  const { user } = useUser()
  const { content } = useRightSidebar()
  const { conversationsData } = conversations || {}
  const { usersOnline } = useUserOnline()
  const { isMobile } = useIsMobile()
  return (
    <>
      <div className="h-full font-poppins flex flex-col p-2 gap-3 mt-2">
        <AddSomeThing content="Add conversation" />
        <AnimatePresence>
          {!isPending &&
            conversationsData?.map(({ conversationId, otherUsers }: any) => {
              const user = otherUsers[0]
              const isOnline = usersOnline.length
                ? usersOnline.some((item: any) => item.userId === user?._id)
                : false
              return (
                <ConversationCard
                  key={conversationId}
                  conversation={otherUsers[0]}
                  conversationId={conversationId}
                  user={otherUsers[0]}
                  isOnline={isOnline}
                  isMobile={isMobile}
                />
              )
            })}
        </AnimatePresence>
      </div>
    </>
  )
}

export default ConversationList
