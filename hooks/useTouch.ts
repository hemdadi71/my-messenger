import { useRef } from 'react'

export function useTouch(setIsOpen: any) {
  const touchTimeoutRef = useRef<any>(null)
  const handleTouchStart = () => {
    touchTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(true)
    }, 1000)
  }

  const handleTouchEnd = () => {
    clearTimeout(touchTimeoutRef?.current)
  }
  return { handleTouchEnd, handleTouchStart }
}
