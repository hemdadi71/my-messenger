'use client'

import React, {
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { CldUploadButton } from 'next-cloudinary'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import clsx from 'clsx'

import { EmojiPicker } from './EmojiPicker'
import MessagePreview from './MessagePreview'
import MobileMessagePreview from '@/app/mobile/components/MobileMessagePreview'

import { getFileType } from '@/utils/getFileType'
import { languageDetector } from '@/utils/languageDetector'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useIsTyping } from '@/hooks/useIsTyping'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useEditMessages } from '@/hooks/useEditMessage'
import { useEditMessage } from '@/providers/EditMessageProvider'
import { useUser } from '@/providers/userProvider'

function createMessageId(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)

  return Array.from(
    bytes,
    byte => byte.toString(16).padStart(2, '0')
  ).join('')
}

const MessageForm = ({
  conversationId,
  socket,
}: any) => {
  const { editValue, editValueDispatch } =
    useEditMessage()

  const [value, setValue] = useState('')
  const [file, setFile] = useState<any>(null)
  const [fileType, setFileType] = useState('')
  const [submitting, setSubmitting] =
    useState(false)

  const { isMobile } = useIsMobile()
  const { user } = useUser()
  const { _id } = user || {}

  const queryClient = useQueryClient()
  const { sendMessageMutate } =
    useSendMessage()

  const { isPending, editMessageMutate } =
    useEditMessages()

  const { handleIsTyping, stopTyping } =
    useIsTyping(
      socket,
      _id,
      conversationId
    )

  const isPersian = languageDetector(value)

  const handleChange = (emoji: string) => {
    const next = value + emoji
    setValue(next)
    handleIsTyping(next)
  }

  const handleUpload = (result: any) => {
    const url = result?.info?.secure_url

    setFileType(getFileType(url))
    setFile({ url })
  }

  const handleSubmit: FormEventHandler<
    HTMLFormElement
  > = e => {
    e.preventDefault()

    if (
      submitting ||
      !_id ||
      (!value.trim() && !file?.url)
    ) {
      return
    }

    setSubmitting(true)
    stopTyping()

    const editing = Boolean(editValue)

    const data = {
      id: editing
        ? editValue.id
        : createMessageId(),
      senderId: _id,
      text: value,
      fileUrl: file?.url,
      conversationId,
      image: user?.image,
      ...(editing
        ? {
          updatedAt:
            new Date().toISOString(),
        }
        : {
          createdAt:
            new Date().toISOString(),
        }),
    }

    const options = {
      onSuccess: () => {
        // ارسال اعلان فقط پس از موفقیت API
        socket.emit(
          editing ? 'edit_msg' : 'send_msg',
          { conversationId }
        )

        void queryClient.invalidateQueries({
          queryKey: [
            'get-messages',
            conversationId,
          ],
        })

        void queryClient.invalidateQueries({
          queryKey: ['get-conversations'],
        })

        if (editing) {
          editValueDispatch(null)
        }

        setFile(null)
        setValue('')
      },
      onError: () =>
        toast.error(
          'Could not save the message. Please try again.'
        ),
      onSettled: () => {
        setSubmitting(false)
      },
    }

    if (editing) {
      editMessageMutate({ data }, options)
    } else {
      sendMessageMutate(data, options)
    }
  }

  useEffect(() => {
    setValue(editValue?.text || '')

    setFile(
      editValue?.fileUrl
        ? { url: editValue.fileUrl }
        : null
    )
  }, [editValue])

  return (
    <div
      className={clsx(
        'dark:bg-secondary bg-light border-t dark:border-t-darkBorder font-poppins relative',
        isMobile
          ? 'fixed bottom-0 w-full'
          : ''
      )}
    >
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
              'w-full bg-transparent md:py-1 pl-14 pr-24 md:pt-3 py-3 h-full outline-none',
              isPersian ? 'font-vazir' : 'font-poppins'
            )}
          />

          <div className="absolute right-4 md:top-3 top-3 flex items-center gap-4">
            <EmojiPicker
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={
                submitting || isPending
              }
            >
              <IoSend
                size={25}
                className="text-[#40A7E3]"
              />
            </button>
          </div>
        </div>
      </form>

      <div className="absolute left-4 top-3">
        <CldUploadButton
          options={{
            maxFiles: 1,
            defaultSource:
              editValue?.fileUrl,
          }}
          onUpload={handleUpload}
          uploadPreset="l7osseh6"
        >
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