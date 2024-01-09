'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
const FramerMotionProvider = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>
}

export default FramerMotionProvider
