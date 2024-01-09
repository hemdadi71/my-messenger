'use client'
import React from 'react'
import ProfileSettingForm from './ProfileSettingForm'
import { useRightSidebar } from '@/providers/SidebarProvider'
import MessagesList from './ConversationList'

const RightSidebar = () => {
  
  return (
    <div className="w-[20%] border-l dark:border-l-[#101921] dark:bg-[#17212B] bg-light font-poppins hidden xl:block">
      <ProfileSettingForm />
    </div>
  )
}

export default RightSidebar
