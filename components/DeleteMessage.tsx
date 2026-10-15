'use client'

import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Button from './Button'
import { useDeleteMessage } from '@/hooks/useDeleteMessage'
import { useSocketConnection } from '@/hooks/useSocketConnect'

const DeleteMessage = ({
  message,
  setOpen,
  conversationId,
}: any) => {
  const { socket } =
    useSocketConnection(
      'join_room',
      conversationId
    )

  const queryClient = useQueryClient()

  const {
    isPending,
    deleteMesageMutate,
  } = useDeleteMessage()

  const handleDeleteMessage = () => {
    deleteMesageMutate(
      { id: message.id },
      {
        onSuccess: () => {
          socket.emit('delete-message', {
            conversationId,
          })

          void queryClient.invalidateQueries({
            queryKey: [
              'get-messages',
              conversationId,
            ],
          })

          void queryClient.invalidateQueries({
            queryKey: [
              'get-conversations',
            ],
          })

          setOpen(false)
        },
      }
    )
  }

  return (
    <div className="space-y-3">
      <div>
        Are you sure you want to delete
        this message?
      </div>

      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3 w-[60%]">
          <Button
            title="Cancel"
            primary
            onClick={() => setOpen(false)}
          />

          <Button
            title="Delete"
            danger
            isLoading={isPending}
            onClick={handleDeleteMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default DeleteMessage