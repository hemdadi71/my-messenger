'use client'

import React from 'react'
import AddSomeThing from './AddSomeThing'
import { AnimatePresence } from 'framer-motion'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useGetContacts } from '@/hooks/useGetContacts'
import ContactCard from './ContactCard'
import { useUserOnline } from '@/providers/onlieUserProvider'
import { useRightSidebar } from '@/providers/SidebarProvider'
import Empty from './Empty'
import Loading from './Loading'
import { useUser } from '@/providers/userProvider'

const ContactsList = () => {
  const { user } = useUser()
  const { data, isPending } = useGetContacts(user?._id)
  const { usersOnline } = useUserOnline()
  return (
    <div className="flex flex-col gap-3 p-2">
      <AddSomeThing content="Add contact" />
      <AnimatePresence>
        {isPending ? (
          <div className='flex justify-center'>
            <Loading width={50} height={50} />
          </div>
        ) : data?.length ? (
          data?.map((contact: any) => {
            const isOnline = usersOnline.length
              ? usersOnline.some((item: any) => item.userId === contact?._id)
              : false
            return (
              <ContactCard
                key={contact._id}
                data={contact}
                isOnline={isOnline}
              />
            )
          })
        ) : (
          <Empty content="Empty contacts" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactsList
