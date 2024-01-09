'use client'
import { Dispatch, createContext, useContext, useState } from 'react'

interface ContextValue {
  user: any
  userDispatch: Dispatch<any>
}

const UserContext = createContext<ContextValue>({
  user: null,
  userDispatch: () => {},
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = useState<any>({})
  const contextValue: ContextValue = {
    user,
    userDispatch,
  }
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserProvider

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useRightonline must be used within a UserProvider')
  }
  return context
}
