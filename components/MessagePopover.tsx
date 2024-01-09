'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { popoverMotion } from '@/framer-motion'
import clsx from 'clsx'
interface MessagePopoverProps {
  children?: React.ReactNode
  popover: {
    open: boolean
    clientX: number
    clientY: number
  }
}

const MessagePopover: React.FC<MessagePopoverProps> = ({
  children,
  popover,
}) => {
  const { clientX, clientY, open } = popover
  return (
    <motion.div
      {...popoverMotion}
      style={{
        top: clientY + 'px',
        left: clientX + 'px',
      }}
      className="fixed bg-[#4132BD] rounded-md rounded-tl-none p-2 z-50 overflow-hidden">
      <div className={clsx(!open && 'hidden')}>{children}</div>
    </motion.div>
  )
}

export default MessagePopover
