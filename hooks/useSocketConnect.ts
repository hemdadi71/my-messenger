import { socketUrl } from '@/constants'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocketConnection(
  roomName: string,
  roomId: string | string[]
) {
  // یک اتصال ثابت برای هر کامپوننت.
  // قبلاً در «هر رندر» یک اتصال جدید ساخته می‌شد (و هیچ‌وقت بسته نمی‌شد)؛
  // autoConnect:false یعنی روی سرور (SSR) هم هیچ اتصالی باز نمی‌شود.
  const [socket] = useState<Socket>(() => io(socketUrl, { autoConnect: false }))

  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [socket])

  useEffect(() => {
    if (!roomId) return
    const join = () => socket.emit(roomName, roomId)
    // اگر هنوز وصل نشده، بعد از اتصال (و بعد از هر اتصال مجدد) یک‌بار ارسال می‌شود
    if (socket.connected) join()
    socket.on('connect', join)
    return () => {
      socket.off('connect', join)
    }
  }, [roomId, socket, roomName])

  return { socket }
}
