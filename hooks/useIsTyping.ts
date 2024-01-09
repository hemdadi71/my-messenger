export function useIsTyping(socket: any, userId: string) {
  let timeout: any
  let isTyping: any
  function timeoutFunction() {
    isTyping = false
    socket.emit('isTyping', { isTyping: false, userId })
  }
  function handleIsTyping(value:string) {
    if (value!=='') {
      isTyping = true
      socket.emit('isTyping', { isTyping: true, userId })
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(timeoutFunction, 1000)
    }
  }
  return { handleIsTyping }
}
