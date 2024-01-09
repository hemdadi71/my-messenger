'use client'

import React from 'react'
import { IoClose } from 'react-icons/io5'
const DeleteMessageModal = ({ setOpen, children, title }: any) => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block dark:bg-black bg-light p-4 z-50 rounded-md font-poppins">
        <div
          onClick={() => setOpen(false)}
          className=" flex items-center justify-between gap-16  mb-4">
          <div className="text-lg font-semibold">{title}</div>
          <IoClose
            size={20}
            className="hover:text-red-500 addTransition cursor-pointer"
          />
        </div>
        {children}
      </div>
      <div
        onClick={() => setOpen(false)}
        className="fixed w-full h-full left-0 top-0 hidden md:block bg-black bg-opacity-40 backdrop-blur-md z-40"
      />
    </>
  )
}

export default DeleteMessageModal
