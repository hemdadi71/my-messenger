import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

export function useIsTyping(
  socket: any,
  userId: string,
  conversationId: string
) {
  const timer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null)

  const stopTyping = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = null

    if (socket.connected && userId) {
      socket.emit('isTyping', {
        conversationId,
        userId,
        isTyping: false,
      })
    }
  }, [socket, userId, conversationId])

  const handleIsTyping = useCallback(
    (value: string) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      if (!value.trim()) {
        stopTyping()
        return
      }

      if (socket.connected && userId) {
        socket.emit('isTyping', {
          conversationId,
          userId,
          isTyping: true,
        })
      }

      timer.current = setTimeout(
        stopTyping,
        1200
      )
    },
    [
      socket,
      userId,
      conversationId,
      stopTyping,
    ]
  )

  useEffect(() => {
    return stopTyping
  }, [stopTyping])

  return {
    handleIsTyping,
    stopTyping,
  }
}