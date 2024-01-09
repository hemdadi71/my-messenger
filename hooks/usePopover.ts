import { useEffect, useState } from 'react'

export function usePopover() {
  const [popover, setPopover] = useState({
    open: false,
    clientX: 0,
    clientY: 0,
    message: {},
  })
  const handleContextMenu = (e: any, message: any) => {
    e.preventDefault()
    const { clientX, clientY } = e
    setPopover({ open: true, clientX, clientY, message })
  }
  useEffect(() => {
    const handleClosePopover = () =>
      setPopover(prev => ({ ...prev, open: false }))

    document.addEventListener('click', handleClosePopover)
    return () => {
      document.removeEventListener('click', handleClosePopover)
    }
  }, [])
  return { handleContextMenu, popover }
}
