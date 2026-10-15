import { lastSeenUpdate } from '@/Services/userService'
import { useEffect } from 'react'

export function useLastSeenUpdate(data: any) {
  useEffect(() => {
    const updateInterval = setInterval(() => {
      lastSeenUpdate(data)
    }, 1 * 60 * 1000)
    return () => {
      clearInterval(updateInterval)
    }
  }, [data])
}
