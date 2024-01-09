
import { useEffect, useRef, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const windowWidth = window.innerWidth
    if (windowWidth < 640) {
      setIsMobile(true)
      return
    } else {
      setIsMobile(false)
    }
  }, [])
  return { isMobile }
}
