import { languageDetector } from '@/utils/languageDetector'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

interface MessagePreviewProps {
  url: string
  fileType: string
  value: string
  setFile: React.Dispatch<any>
}

const MessagePreview: React.FC<MessagePreviewProps> = ({
  url,
  fileType,
  setFile,
  value,
}) => {
  const isPersian = languageDetector(value)
  return (
    <>
      {url && (
        <div className="fixed md:flex hidden w-[25%] flex-col items-center gap-3 bg-black py-3 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 rounded-lg">
          <div className="text-lg border-b pb-2">
            <p>Message Preview</p>
          </div>
          <div className="relative">
            {fileType === 'image' ? (
              <Image
                className="rounded-lg"
                src={url}
                width={200}
                height={200}
                alt="image-message"
              />
            ) : fileType === 'video' ? (
              <video
                width={200}
                height={200}
                src={url}
                muted
                autoPlay
                loop
                className="rounded-lg"
              />
            ) : null}
            <IoMdCloseCircle
              size={20}
              className="text-red-500 absolute top-1 right-1 cursor-pointer"
              onClick={() => setFile({})}
            />
          </div>
          <p
            dir={isPersian ? 'rtl' : 'ltr'}
            className={clsx(
              'break-words max-w-full px-4',
              isPersian ? 'font-vazir' : 'font-poppins'
            )}>
            {value}
          </p>
        </div>
      )}
    </>
  )
}

export default MessagePreview
