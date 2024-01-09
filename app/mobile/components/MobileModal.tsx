'use client'

import clsx from 'clsx'
import React from 'react'

interface MobileDeleteMessageModalProps {
  children: React.ReactNode
  open: boolean
  setOpen: any
  className?: string
  title?: string
  height?: string
}

const MobileModal: React.FC<MobileDeleteMessageModalProps> = ({
  children,
  open,
  setOpen,
  className,
  title,
  height,
}) => {
  return (
    <>
      <div
        className={clsx(
          'fixed w-full bottom-0 dark:bg-black bg-white rounded-t-[2rem] z-50 left-0 overflow-hidden transition-all ease-in-out duration-500 font-poppins flex sm:hidden flex-col gap-3',
          open ? height : 'h-0',
          className
        )}>
        <div className="text-lg font-semibold py-3 text-center dark:text-white text-black">
          {title}
        </div>
        <div className="pb-2 px-4">{children}</div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={clsx(
          'fixed w-full h-full top-0 left-0 z-40 bg-opacity-40 backdrop-blur-sm block sm:hidden',
          open ? 'block' : 'hidden'
        )}
      />
    </>
  )
}

export default MobileModal
