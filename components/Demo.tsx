'use client'

import Drawer from '@/app/mobile/components/Drawer'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
const Demo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-l-md bg-primary font-semibold font-poppins fixed right-0 top-[20%] py-1 px-2 cursor-pointer hover:text-rose-600 addTransition">
        Show site demo video
      </button>
      <Drawer open={open} setOpen={setOpen} className="right-0" width="w-full">
        <div className="flex flex-col gap-3 px-3 py-5">
          <IoClose onClick={() => setOpen(false)} size={25} className='hover:text-red-500 addTransition cursor-pointer' />
          <div className='flex items-center justify-center'>
            <video
              width={950}
              className="rounded-md"
              src="https://res.cloudinary.com/durpzunxl/video/upload/v1704744417/fssssstnothxeujowqgu.mp4"
              muted
              controls
            />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Demo
