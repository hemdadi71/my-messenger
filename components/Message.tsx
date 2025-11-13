'use client'

import clsx from 'clsx'
import Image from 'next/image'
import React, { useState } from 'react'
import { format } from 'timeago.js'
import ViewMedia from './ViewMedia'
import { motion } from 'framer-motion'
import { messageMotionLeft, messageMotionRight } from '@/framer-motion'
import MobileModal from '@/app/mobile/components/MobileModal'
import MobileViewMedia from '@/app/mobile/components/MobileViewMedia'
const Message = ({
  index,
  item,
  user,
  handleContextMenu,
  setModal,
  fileType,
  isPersian,
  modal,
}: any) => {
  const [mobileModal, setMobileModal] = useState(false)
  const { senderId, image, _id, fileUrl, text, createdAt, updatedAt } =
    item || {}
  const isCurrentUser = senderId === user?._id
  const motionDivProps: any = isCurrentUser
    ? messageMotionRight
    : messageMotionLeft
  return (
    <motion.div
      {...motionDivProps}
      key={index}
      className={clsx(
        'chat addTransition',
        senderId === user?._id ? 'chat-end' : 'chat-start'
      )}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full relative">
          <Image alt="Tailwind CSS chat bubble component" src={image||'/images/placeholder.jpg'} fill />
        </div>
      </div>

      <div
        onContextMenu={e => handleContextMenu(e, item)}
        id={_id}
        className="chat-bubble dark:bg-[#2A323C] bg-neutral-300 max-w-[80%] dark:text-neutral-300 text-neutral-600 flex flex-col gap-2">
        <div
          className="cursor-pointer"
          onClick={() => {
            setModal({ open: true, fileUrl, fileType })
            setMobileModal(true)
          }}>
          {fileUrl ? (
            fileType === 'image' ? (
              <Image
                src={fileUrl}
                width={150}
                height={150}
                alt="image"
                className="rounded-md"
              />
            ) : (
              <video
                width={170}
                src={fileUrl}
                className="rounded-md"
                autoPlay
                muted
                loop
              />
            )
          ) : null}
        </div>
        <div className="pointer-events-none flex flex-col gap-1">
          <p
            dir={isPersian ? 'rtl' : 'ltr'}
            className={clsx(
              'break-words',
              isPersian ? 'font-vazir' : 'font-poppins'
            )}>
            {text}
          </p>
          <time
            className={clsx(
              'text-xs dark:opacity-50 opacity-70',
              updatedAt && 'text-rose-500 dark:text-primary'
            )}>
            <span className="font-semibold">{updatedAt && 'Edited'}</span>{' '}
            {format(updatedAt || createdAt)}
          </time>
        </div>
      </div>
      {modal.open && <ViewMedia modal={modal} setModal={setModal} />}
      <MobileModal
        open={mobileModal}
        setOpen={setMobileModal}
        title="View Media"
        className="flex justify-center"
        height="h-[50%]">
        <MobileViewMedia fileUrl={fileUrl} fileType={fileType} />
      </MobileModal>
    </motion.div>
  )
}

export default Message
