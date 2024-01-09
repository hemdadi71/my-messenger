'use client'
import { Dispatch, createContext, useContext, useState } from 'react'

interface ContextValue {
  editValue: any
  editValueDispatch: Dispatch<any>
}

const EditMessageContext = createContext<ContextValue>({
  editValue: null,
  editValueDispatch: () => {},
})

const EditMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [editValue, editValueDispatch] = useState<any>(null)
  const contextValue: ContextValue = {
    editValue,
    editValueDispatch,
  }
  return (
    <EditMessageContext.Provider value={contextValue}>
      {children}
    </EditMessageContext.Provider>
  )
}

export default EditMessageProvider

export const useEditMessage = () => {
  const context = useContext(EditMessageContext)
  if (!context) {
    throw new Error('useRightonline must be used within a EditMessageProvider')
  }
  return context
}
