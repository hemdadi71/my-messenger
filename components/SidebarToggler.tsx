'use client'
import React from 'react'
import Tooltips from './Tooltip'

import { RiContactsFill } from "react-icons/ri";
import { MdOutlineMessage } from 'react-icons/md'
import { useRightSidebar } from '@/providers/SidebarProvider'
const SidebarToggler = () => {
  const { content, contentDispatch } = useRightSidebar()

  return (
    <div>
      <Tooltips
        title={content === 'CONTACTS' ? 'Conversations list' : 'Contacts list'}>
        {content === 'CONTACTS' ? (
          <MdOutlineMessage
            size={20}
            onClick={() => contentDispatch('CONVERSATIONSLIST')}
          />
        ) : (
          <RiContactsFill
            size={20}
            onClick={() => contentDispatch('CONTACTS')}
          />
        )}
      </Tooltips>
    </div>
  )
}

export default SidebarToggler
