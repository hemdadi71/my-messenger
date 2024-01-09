import { useIsMobile } from '@/hooks/useIsMobile'
import clsx from 'clsx'
import React from 'react'

const Circle = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useIsMobile()
  return (
    <div
      className={clsx(
        'rounded-full p-2 addTransition cursor-pointer flex items-center justify-center',
        !isMobile && 'hover:bg-neutral-200 dark:hover:bg-gray_primary'
      )}>
      {children}
    </div>
  )
}

export default Circle
