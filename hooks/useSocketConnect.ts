import { socketUrl } from '@/constants'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export function useSocketConnection(
  roomName: string,
  roomId: string | string[]
) {
  let socket: any
  socket = io(socketUrl)
  useEffect(() => {
    roomId && socket.emit(roomName, roomId)
  }, [roomId, socket, roomName])

  return { socket }
}
