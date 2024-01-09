'use client'

import React from 'react'
import { TbMoodEmpty } from 'react-icons/tb'

const Empty = ({ content }: { content: string }) => {
  return (
    <div className="bg-rose-800 p-2 rounded-md flex items-center justify-center gap-3 group pointer-events-none">
      <TbMoodEmpty size={30} />
      <p>Contacts is empty</p>
    </div>
  )
}

export default Empty
