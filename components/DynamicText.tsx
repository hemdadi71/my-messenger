'use client'

import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

interface DynamicTextProps {
  children: React.ReactNode
}

const DynamicText: React.FC<DynamicTextProps> = ({ children }) => {
  const [isOverflowed, setIsOverflowed] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      const element = document.getElementById('dynamicText')
      if (element) {
        setIsOverflowed(element.scrollWidth > element.clientWidth)
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [])

  return (
    <div
      id="dynamicText"
      className={clsx(
        'md:w-[90%] 2xl:w-full mt-1 text-sm overflow-hidden',
        isOverflowed && 'marquee-animation'
      )}>
      {children}
    </div>
  )
}

export default DynamicText
