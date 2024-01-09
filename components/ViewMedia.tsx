'use client'

import Image from 'next/image'
import React from 'react'

interface ViewMediaProps {
  setModal: any
  modal: any
}

const ViewMedia: React.FC<ViewMediaProps> = ({ setModal, modal }) => {
  const { fileType, fileUrl } = modal
  return (
    <>
      <div className="fixed z-50 hidden md:block -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2 rounded-md p-3">
        <div className="rounded-md overflow-hidden">
          {fileType === 'image' ? (
            <Image
              src={fileUrl}
              width={300}
              height={300}
              alt="image"
              className="rounded-md"
            />
          ) : (
            <video
              width={300}
              src={fileUrl}
              className="rounded-md"
              autoPlay
              loop
            />
          )}
        </div>
      </div>
      <div
        onClick={() => setModal(false)}
        className="bg-black bg-opacity-20 hidden md:block backdrop-blur-sm z-40 w-full h-full fixed top-0 left-0"
      />
    </>
  )
}

export default ViewMedia
