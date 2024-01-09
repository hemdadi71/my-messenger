'use  client'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

const MobileMessagePreview = ({ url, fileType, setFile, value }: any) => {
  return (
    <>
      <div
        className={clsx(
          'fixed w-full z-50 dark:bg-black bg-white rounded-b-2xl transition-all ease-in-out duration-500 overflow-hidden md:hidden top-0 left-0 flex justify-center gap-3',
          url ? 'h-[40%]' : 'h-0'
        )}>
        <div className="flex flex-col items-center p-3 gap-3">
          <div className="text-lg border-b pb-2">
            <p>Message Preview</p>
          </div>
          <div className="relative">
            {fileType === 'image' ? (
              <Image
                className="rounded-lg overflow-hidden"
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
          <input
            type="text"
            readOnly
            value={value}
            className="bg-transparent max-h-20 outline-none text-center"
          />
        </div>
      </div>
      <div />
    </>
  )
}

export default MobileMessagePreview
