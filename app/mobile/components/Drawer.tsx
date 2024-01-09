'use client'

import clsx from 'clsx'
import React from 'react'
import DrawerHeader from './DrawerHeader'
import DrawerList from './DrawerList'

interface DrawerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  className: string
  children: React.ReactNode
  width: string
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  className,
  children,
  width,
}) => {
  return (
    <>
      <>
        <div
          className={clsx(
            'h-full fixed dark:bg-secondary bg-light top-0 z-50 transition-all ease-in-out duration-500 overflow-hidden font-poppins dark:text-neutral-300 text-neutral-800',
            open ? width : 'w-0',
            className
          )}>
          {children}
        </div>
        <div
          onClick={() => setOpen(false)}
          className={clsx(
            'bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-40',
            open ? 'block' : 'hidden'
          )}
        />
      </>
    </>
  )
}

export default Drawer
