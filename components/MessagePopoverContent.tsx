'use client'
import { useEditMessage } from '@/providers/EditMessageProvider'
import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

const MessagePopoverContent = ({ setOpen, message, userId }: any) => {
  const { editValueDispatch } = useEditMessage()
  return (
    <div className="flex flex-col gap-2">
      {userId === message.senderId && (
        <div
          onClick={() => {
            editValueDispatch(message)
          }}
          className="flex items-center gap-2 text-[15px] hover:text-primary cursor-pointer addTransition">
          <FaRegEdit size={17} />
          <p>Edit</p>
        </div>
      )}

      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 hover:text-red-500 cursor-pointer addTransition text-[15px]">
        <MdDeleteOutline size={17} />
        <p>Delete</p>
      </div>
    </div>
  )
}

export default MessagePopoverContent
