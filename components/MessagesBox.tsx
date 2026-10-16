/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { getFileType } from '@/utils/getFileType'
import { languageDetector } from '@/utils/languageDetector'
import React, { useEffect, useRef, useState } from 'react'
import MessagePopover from './MessagePopover'
import MessagePopoverContent from './MessagePopoverContent'
import { usePopover } from '@/hooks/usePopover'
import Message from './Message'
import IsTyping from './IsTyping'
import DeleteMessageModal from './DeleteMessageModal'
import DeleteMessage from './DeleteMessage'
import { AnimatePresence } from 'framer-motion'
import MobileModal from '@/app/mobile/components/MobileModal'
const MessagesBox = ({
  chat,
  socket,
  otherUsers,
  isTyping,
  setIsTyping,
  conversationId,
}: any) => {
  const { user } = useIsSuccessUser()
  const [modal, setModal] = useState({ open: false, fileUrl: '', fileType: '' })
  const [userId, setUserId] = useState('')
  const { handleContextMenu, popover } = usePopover()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    // قبلاً با هر تغییر isTyping/userId یک listener جدید اضافه می‌شد و هیچ‌وقت
    // برداشته نمی‌شد؛ با طولانی شدن چت تعداد handlerها زیاد می‌شد
    const handler = ({
      isTyping,
      userId,
    }: {
      isTyping: boolean
      userId: string
    }) => {
      setIsTyping(isTyping)
      setUserId(userId)
    }
    socket.on('setIsTyping', handler)
    return () => {
      socket.off('setIsTyping', handler)
    }
  }, [socket])

  return (
    <>
      {!chat.length && (
        <div className="font-poppins flex items-center justify-center h-full">
          <div className="flex flex-col items-center bg-rose-600 p-6 rounded-md gap-3 pointer-events-none">
            <p className="waving">No messages here yet...</p>
            <p className="waving">Send a message</p>
          </div>
        </div>
      )}
      <div className="text-white flex flex-col gap-2 overflow-x-hidden">
        {chat?.map((item: any, index: number) => {
          const fileType = item?.fileUrl && getFileType(item?.fileUrl)
          const isPersian = languageDetector(item?.text)
          return (
            <Message
              index={index}
              item={item}
              fileType={fileType}
              key={item._id}
              user={user}
              setModal={setModal}
              handleContextMenu={handleContextMenu}
              modal={modal}
              isPersian={isPersian}
            />
          )
        })}
        <AnimatePresence>
          {popover.open && (
            <MessagePopover popover={popover}>
              <MessagePopoverContent
                message={popover.message}
                userId={user._id}
                setOpen={setOpen}
              />
            </MessagePopover>
          )}
        </AnimatePresence>

        {isTyping && userId !== user._id && (
          <IsTyping otherUsers={otherUsers} />
        )}

        {open && (
          <DeleteMessageModal setOpen={setOpen} title="Delete message">
            <DeleteMessage
              message={popover.message}
              setOpen={setOpen}
              conversationId={conversationId}
            />
          </DeleteMessageModal>
        )}
        <MobileModal
          open={open}
          setOpen={setOpen}
          className="flex items-center"
          title="Delete message"
          height="h-[26%]">
            <DeleteMessage
              message={popover.message}
              setOpen={setOpen}
              conversationId={conversationId}
            />
        </MobileModal>
      </div>
    </>
  )
}

export default MessagesBox
