'use client'

import Image from 'next/image'
import React from 'react'

interface MobileViewMediaProps {
  fileUrl: string
  fileType: string
}

const MobileViewMedia: React.FC<MobileViewMediaProps> = ({
  fileUrl,
  fileType,
}) => {
  return (
    <div className='flex items-center justify-center pb-3'>
      {fileType === 'image' ? (
        <Image
          src={fileUrl}
          width={300}
          height={300}
          alt="image"
          className="rounded-md"
        />
      ) : (
        <video width={300} src={fileUrl} className="rounded-md" autoPlay loop />
      )}
    </div>
  )
}

export default MobileViewMedia
