/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import SidebarToggler from './SidebarToggler'
import ConversationList from './ConversationList'
import { useRightSidebar } from '@/providers/SidebarProvider'
import { useUserOnline } from '@/providers/onlieUserProvider'
import ContactsList from './ContactsList'
import { useIsMobile } from '@/hooks/useIsMobile'
import clsx from 'clsx'
import { useGetConversations } from '@/hooks/useGetConversations'
import { useUser } from '@/providers/userProvider'

const Sidebar = ({ socket }: any) => {
  const { content } = useRightSidebar()
  const { usersOnlineDispatch } = useUserOnline()
  const { user } = useUser()
  const { conversations, isPending } = useGetConversations(user._id, content)
  const { isMobile } = useIsMobile()
  useEffect(() => {
    socket.on('get-users', (users: any) => {
      usersOnlineDispatch(users)
    })
  }, [])
  return (
    <div className="md:w-[50%] lg:w-[30%] xl:w-[20%] w-full border-r dark:border-r-[#101921] dark:bg-[#17212B]">
      <div
        className={clsx(
          'h-20 flex items-center justify-between px-5 font-bold border-b dark:border-b-[#101921]',
          isMobile && 'hidden'
        )}>
        <p className="font-poppins text-xl">
          {content === 'CONTACTS' ? 'Contacts' : 'Conversations'}
        </p>
        <div className="flex items-center gap-1">
          <SidebarToggler />
        </div>
      </div>
      <div className={clsx(isMobile && 'hidden')}>
        {content === 'CONTACTS' ? (
          <ContactsList />
        ) : (
          <ConversationList
            conversations={conversations}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  )
}

export default Sidebar
