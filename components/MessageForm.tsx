/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { EmojiPicker } from './EmojiPicker'
import { IoSend } from 'react-icons/io5'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { CldUploadButton } from 'next-cloudinary'
import { getFileType } from '@/utils/getFileType'
import MessagePreview from './MessagePreview'
import { useSendMessage } from '@/hooks/useSendMessage'
import { languageDetector } from '@/utils/languageDetector'
import clsx from 'clsx'
import { useIsTyping } from '@/hooks/useIsTyping'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useEditMessage } from '@/providers/EditMessageProvider'
import { useEditMessages } from '@/hooks/useEditMessage'
import { useUser } from '@/providers/userProvider'
import MobileMessagePreview from '@/app/mobile/components/MobileMessagePreview'

const MessageForm = ({ conversationId, setChat, socket }: any) => {
  const { editValue, editValueDispatch } = useEditMessage()
  const [emoji, setEmoji] = useState('')
  const [value, setValue] = useState('')
  const [file, setFile] = useState<any>(null)
  const { isMobile } = useIsMobile()
  const [fileType, setFileType] = useState('')
  const { user } = useUser()
  const { sendMessageMutate } = useSendMessage()
  const { isPending, editMessageMutate } = useEditMessages()
  const { _id } = user || {}
  const { handleIsTyping } = useIsTyping(socket, _id)
  const isPersian = languageDetector(value)
  const handleChange = (emoji: string) => {
    setEmoji(prev => prev + emoji)
    setValue((prev: any) => prev + emoji)
  }
  const handleUpload = (result: any) => {
    const fileType = getFileType(result?.info?.secure_url)
    setFileType(fileType)
    setFile({
      url: result?.info?.secure_url,
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const data: any = {
      roomId: conversationId,
      id: Date.now(),
      senderId: _id,
      text: value,
      fileUrl: file?.url,
      conversationId,
      image: user?.image,
      createdAt: new Date(Date.now()),
      updatedAt: '',
      seen: false,
    }

    if (value || file?.url) {
      if (!editValue) {
        sendMessageMutate(data)
        await socket.emit('send_msg', data)
      } else {
        data.id = editValue.id
        data.updatedAt = new Date(Date.now())
        await socket.emit('edit_msg', data)
        editMessageMutate(
          { data },
          { onSuccess: () => editValueDispatch(null) }
        )
      }
    }
    setFile({})
    setValue('')
    socket.emit('isTyping', { isTyping: false, userId: _id })
  }
  useEffect(() => {
    socket.on('receive_msg', (data: any) => {
      setChat(data)
    })
  }, [setChat])
  useEffect(() => {
    setValue(editValue?.text)
    editValue?.fileUrl && setFile(editValue?.fileUrl)
  }, [editValue])

  return (
    <div
      className={clsx(
        'dark:bg-secondary bg-light border-t dark:border-t-darkBorder font-poppins relative',
        isMobile ? 'fixed bottom-0 w-full' : ''
      )}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            dir={isPersian ? 'rtl' : 'ltr'}
            value={value}
            placeholder="Write a message..."
            onChange={e => {
              setValue(e.target.value)
              handleIsTyping(e.target.value)
            }}
            type="text"
            className={clsx(
              'w-full bg-transparent md:py-1 pl-14 pr-24 md:pt-3 py-3 h-full  outline-none',
              isPersian ? 'font-vazir' : 'font-poppins'
            )}
          />

          <div className="absolute right-4 md:top-3 top-3 flex items-center gap-4">
            <EmojiPicker onChange={handleChange} />
            <button type="submit">
              <IoSend size={25} className="text-[#40A7E3]" />
            </button>
          </div>
        </div>
      </form>
      <div className="absolute left-4 top-3">
        <CldUploadButton
          options={{ maxFiles: 1, defaultSource: editValue?.fileUrl }}
          onUpload={handleUpload}
          uploadPreset="l7osseh6">
          <GrAttachment size={25} />
        </CldUploadButton>
      </div>
      <MessagePreview
        url={file?.url}
        value={value}
        setFile={setFile}
        fileType={fileType}
      />
      <MobileMessagePreview
        url={file?.url}
        value={value}
        setFile={setFile}
        fileType={fileType}
      />
    </div>
  )
}

export default MessageForm
