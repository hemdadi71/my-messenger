'use client'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { LuMessagesSquare } from 'react-icons/lu'
import { MdOutlinePermContactCalendar } from 'react-icons/md'
import Tooltips from './Tooltip'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useAddToContacts } from '@/hooks/useAddToContacts'
import AddConversation from './AddConversation'
import { formatLastSeen } from '@/utils/formatLastSeen'
import Loading from './Loading'
import { motion, AnimatePresence } from 'framer-motion'
import { motionDivProps } from '@/framer-motion'
import { useUserOnline } from '@/providers/onlieUserProvider'

const FindedUser = ({ data, setOpen }: { data: any; setOpen: any }) => {
  const { image, firstName, lastName, _id: id } = data || {}
  const { user } = useIsSuccessUser()
  const isCurrentUser = user?._id === id
  const { isPending, data: Data, addToContactsMutate } = useAddToContacts()
  const addToContacts = () => {
    addToContactsMutate({ id }, { onSuccess: () => setOpen(false) })
  }
  const { usersOnline } = useUserOnline()
  const isOnline = usersOnline.length
    ? usersOnline.some((item: any) => item.userId === id)
    : false
  return (
    <>
      <motion.div
        {...motionDivProps}
        className="flex justify-between w-full p-3 dark:bg-gray-800 bg-neutral-300 addTransition rounded-lg bg-opacity-40 dark:text-white font-poppins">
        <div className="flex gap-4">
          <Avatar imageUrl={image} className="w-20 h-20" />
          <div className="mt-3 flex flex-col gap-4">
            <div className="flex gap-1 capitalize">
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
            <div className="text-sm flex items-center gap-1 text-neutral-500">
              {isOnline ? (
                <div className="text-green-500 font-semibold">
                  <p>Online</p>
                </div>
              ) : (
                <p>Last seen recently</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {!isCurrentUser &&
            (isPending ? (
              <Loading width={30} height={30} />
            ) : (
              <Tooltips title="Add to contacts">
                <button onClick={addToContacts} disabled={isCurrentUser}>
                  <MdOutlinePermContactCalendar size={20} />
                </button>
              </Tooltips>
            ))}

          <AddConversation
            data={data}
            isCurrentUser={isCurrentUser}
            setOpen={setOpen}
          />
        </div>
      </motion.div>
    </>
  )
}

export default FindedUser
