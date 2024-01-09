'use client'

import React from 'react'
import Button from './Button'
import { useDeleteMessage } from '@/hooks/useDeleteMessage'
import { socketUrl } from '@/constants'
import { io } from 'socket.io-client'

const DeleteMessage = ({ message, setOpen, conversationId }: any) => {
  let socket: any
  socket = io(socketUrl)
  const { isPending, deleteMesageMutate } = useDeleteMessage()
  const handleDeleteMessage = () => {
    socket.emit('delete-message', { message, conversationId })
    deleteMesageMutate(
      { id: message.id },
      {
        onSuccess: () => {
          setOpen(false)
        },
      }
    )
  }
  return (
    <>
      <div className="space-y-3">
        <div>Are you sure you want to delete this message?</div>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3 w-[60%]">
            <Button title="Cancel" primary onClick={() => setOpen(false)} />
            <Button
              title="Delete"
              danger
              isLoading={isPending}
              onClick={handleDeleteMessage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteMessage
