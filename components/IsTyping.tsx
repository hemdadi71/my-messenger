'use client'

import Image from 'next/image'
import React from 'react'

const IsTyping = ({ otherUsers }: any) => {
  return (
    <div className="chat chat-start addTransition">
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full relative">
          <Image
            alt="Tailwind CSS chat bubble component"
            src={otherUsers?.image||'/images/placeholder.jpg'}
            fill
          />
        </div>
      </div>
      <div className="chat-bubble dark:bg-[#2A323C] bg-neutral-300 dark:text-neutral-300 text-neutral-600 flex items-center gap-1">
        <p className="text-sm">Typing</p>
        <Image
          className="mt-3"
          src={'/icons/dots.svg'}
          width={20}
          height={20}
          alt="typing"
        />
      </div>
    </div>
  )
}

export default IsTyping
