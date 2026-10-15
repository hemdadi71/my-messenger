'use client'

import React, {
  useEffect,
  useState,
} from 'react'
import { AnimatePresence } from 'framer-motion'

import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { usePopover } from '@/hooks/usePopover'
import { getFileType } from '@/utils/getFileType'
import { languageDetector } from '@/utils/languageDetector'

import MessagePopover from './MessagePopover'
import MessagePopoverContent from './MessagePopoverContent'
import Message from './Message'
import IsTyping from './IsTyping'
import DeleteMessageModal from './DeleteMessageModal'
import DeleteMessage from './DeleteMessage'
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

  const [modal, setModal] = useState({
    open: false,
    fileUrl: '',
    fileType: '',
  })

  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false)

  const { handleContextMenu, popover } =
    usePopover()

  useEffect(() => {
    let timer:
      | ReturnType<typeof setTimeout>
      | undefined

    const clearTyping = () => {
      setIsTyping(false)
    }

    const handler = (data: {
      isTyping: boolean
      userId: string
      conversationId: string
    }) => {
      if (
        data.conversationId !==
          conversationId ||
        data.userId === user?._id
      ) {
        return
      }

      if (timer) {
        clearTimeout(timer)
      }

      setIsTyping(data.isTyping)
      setUserId(data.userId)

      if (data.isTyping) {
        timer = setTimeout(
          clearTyping,
          2000
        )
      }
    }

    socket.on('setIsTyping', handler)
    socket.on('disconnect', clearTyping)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }

      socket.off('setIsTyping', handler)
      socket.off(
        'disconnect',
        clearTyping
      )
    }
  }, [
    socket,
    conversationId,
    user?._id,
    setIsTyping,
  ])

  return (
    <>
      {!chat.length && (
        <div className="font-poppins flex items-center justify-center h-full">
          <div className="flex flex-col items-center bg-rose-600 p-6 rounded-md gap-3 pointer-events-none">
            <p className="waving">
              No messages here yet...
            </p>
            <p className="waving">
              Send a message
            </p>
          </div>
        </div>
      )}

      <div className="text-white flex flex-col gap-2 overflow-x-hidden">
        {chat?.map(
          (item: any, index: number) => {
            const fileType =
              item?.fileUrl &&
              getFileType(item.fileUrl)

            const isPersian =
              languageDetector(item?.text)

            return (
              <Message
                key={item._id}
                index={index}
                item={item}
                fileType={fileType}
                user={user}
                setModal={setModal}
                handleContextMenu={
                  handleContextMenu
                }
                modal={modal}
                isPersian={isPersian}
              />
            )
          }
        )}

        <AnimatePresence>
          {popover.open && (
            <MessagePopover
              popover={popover}
            >
              <MessagePopoverContent
                message={popover.message}
                userId={user?._id}
                setOpen={setOpen}
              />
            </MessagePopover>
          )}
        </AnimatePresence>

        {isTyping &&
          userId !== user?._id && (
            <IsTyping
              otherUsers={otherUsers}
            />
          )}

        {open && (
          <DeleteMessageModal
            setOpen={setOpen}
            title="Delete message"
          >
            <DeleteMessage
              message={popover.message}
              setOpen={setOpen}
              conversationId={
                conversationId
              }
            />
          </DeleteMessageModal>
        )}

        <MobileModal
          open={open}
          setOpen={setOpen}
          className="flex items-center"
          title="Delete message"
          height="h-[26%]"
        >
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