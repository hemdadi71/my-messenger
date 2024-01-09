import { useEffect, useState } from 'react'

export function useTimer(variant: string) {
  const [time, setTime] = useState(90)
  useEffect(() => {
    const TimeInterval = setInterval(() => {
      variant === 'CHECK-OTP' && time > 0 && setTime(t => t - 1)
    }, 1000)
    return () => {
      clearInterval(TimeInterval)
    }
  }, [time, variant])
  return { time, setTime }
}
