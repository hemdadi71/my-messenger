'use client'
import { Dispatch, createContext, useContext, useState } from 'react'

interface ContextValue {
  usersOnline: any
  usersOnlineDispatch: Dispatch<any>
}

const OnlineContext = createContext<ContextValue>({
  usersOnline: [],
  usersOnlineDispatch: () => {},
})

const OnlineProvider = ({ children }: { children: React.ReactNode }) => {
  const [usersOnline, usersOnlineDispatch] = useState<any>([])
  const contextValue: ContextValue = {
    usersOnline,
    usersOnlineDispatch,
  }
  return (
    <OnlineContext.Provider value={contextValue}>
      {children}
    </OnlineContext.Provider>
  )
}

export default OnlineProvider

export const useUserOnline = () => {
  const context = useContext(OnlineContext)
  if (!context) {
    throw new Error('useRightonline must be used within a RightonlineProvider')
  }
  return context
}
