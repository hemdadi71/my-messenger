'use client'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  imageUrl: string
  className?: string
  isOnline?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, className, isOnline }) => {
  return (
    <div
      className={clsx(
        'rounded-full border-2 flex items-center justify-center p-[5px]',
        isOnline ? 'border-green-500' : 'border-transparent'
      )}>
      <div className={clsx('relative inline-block', className)}>
        <Image
          className="object-cover rounded-full"
          src={imageUrl || '/images/placeholder.jpg'}
          fill
          alt="avatar"
        />
      </div>
    </div>
  )
}

export default Avatar
