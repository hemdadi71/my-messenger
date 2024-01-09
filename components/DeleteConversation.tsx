'use client'

import { useDeletConversation } from '@/hooks/useDeleteConversation'
import React from 'react'
import Button from './Button'
import Avatar from './Avatar'
import { formatLastSeen } from '@/utils/formatLastSeen'
import { io } from 'socket.io-client'
import { socketUrl } from '@/constants'

const DeleteConversation = ({
  conversationId,
  setIsOpen,
  user,
  isOnline,
}: any) => {
  let socket: any
  socket = io(socketUrl)
  const { isPending, deleteConversationMutate } = useDeletConversation()
  const { firstName, lastName, image, lastSeen } = user || {}
  const handleRemoveConversation = () => {
    deleteConversationMutate(
      { id: conversationId },
      {
        onSuccess: () => {
          setIsOpen(false)
          socket.emit('delete-conversation', { id: conversationId })
        },
      }
    )
  }
  return (
    <>
      <div className="font-poppins flex flex-col gap-2">
        <div className="text-lg">
          <p>Are you sure to remove conversation?</p>
        </div>
        <div className="flex gap-4 items-center justify-center dark:text-primary text-gray_primary capitalize">
          <Avatar
            imageUrl={image}
            className="w-12 h-12 group-hover:scale-[1.1] addTransition"
          />
          <div className="space-y-2">
            <div className="capitalize flex gap-1 mt-1 text-sm">
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
            <div className="text-xs flex items-center gap-1 text-neutral-500">
              {isOnline ? (
                <div className="text-green-500 font-semibold">
                  <p>Online</p>
                </div>
              ) : (
                <>
                  <p>Last seen </p>
                  <p className="font-bold">recently</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <Button title="Cancel" primary onClick={() => setIsOpen(false)} />
          <Button
            title="Delete"
            danger
            onClick={handleRemoveConversation}
            disabled={isPending}
            isLoading={isPending}
          />
        </div>
      </div>
    </>
  )
}

export default DeleteConversation
