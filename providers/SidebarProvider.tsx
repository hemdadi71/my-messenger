'use client'
import { useParams, usePathname } from 'next/navigation'
import { createContext, useContext, useReducer, useState } from 'react'
type content = 'CONTACTS' | 'CONVERSATIONSLIST'
interface SidebarContextProps {
  content: content
  contentDispatch: React.Dispatch<React.SetStateAction<content>>
}
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)
// ..............................................................

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  const { id } = useParams()
  const isConversationPage = pathName === `/messages/${id}`
  const [content, contentDispatch] = useState<content>(
    isConversationPage ? 'CONVERSATIONSLIST' : 'CONTACTS'
  )
  const contextValue: SidebarContextProps = {
    content,
    contentDispatch,
  }
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
// .........................................................
export const useRightSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error(
      'useRightSidebar must be used within a RightSidebarProvider'
    )
  }
  return context
}
