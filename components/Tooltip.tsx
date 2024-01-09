import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import Circle from './Circle'
import { useIsMobile } from '@/hooks/useIsMobile'
import clsx from 'clsx'

interface TooltipProps {
  children: React.ReactNode
  title: string
}

const Tooltips: React.FC<TooltipProps> = ({ children, title }) => {
  const { isMobile } = useIsMobile()
  return (
    <>
      <Tooltip>
        <TooltipTrigger className={clsx(!isMobile && 'hover:text-primary')}>
          <Circle>{children}</Circle>
        </TooltipTrigger>
        <TooltipContent className="font-poppins font-medium text-xs">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}

export default Tooltips
