'use client'
import { Dispatch, createContext, useContext, useState } from 'react'

interface ContextValue {
  chat: any
  chatDispatch: Dispatch<any>
}

const ChatContext = createContext<ContextValue>({
  chat: null,
  chatDispatch: () => {},
})

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, chatDispatch] = useState<any>([])
  const contextValue: ContextValue = {
    chat,
    chatDispatch,
  }
  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}

export default ChatProvider

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useRightonline must be used within a ChatProvider')
  }
  return context
}
