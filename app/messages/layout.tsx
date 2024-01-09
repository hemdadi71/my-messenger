/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import RightSidebar from '@/components/RightSidebar'
import Sidebar from '@/components/Sidebar'
import { useIsMobile } from '@/hooks/useIsMobile'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useSocketConnection } from '@/hooks/useSocketConnect'
import { useUserOnline } from '@/providers/onlieUserProvider'
import clsx from 'clsx'
import {  useState } from 'react'
import { PiArrowLineLeftFill } from 'react-icons/pi'
import Drawer from '../mobile/components/Drawer'
import ProfileSettingForm from '@/components/ProfileSettingForm'
interface MessagesLayoutProps {
  children: React.ReactNode
}

const MessagesLayout: React.FC<MessagesLayoutProps> = ({ children }) => {
  const { user } = useIsSuccessUser()
  const { socket } = useSocketConnection('new-user-add', user._id)
  const { isMobile } = useIsMobile()
  const [open, setOpen] = useState(false)
  return (
    <div
      className={clsx(
        'bg-light dark:bg-secondary h-full overflow-hidden dark:text-white text-gray-800',
        isMobile ? 'hidden' : 'flex'
      )}>
      <Sidebar socket={socket} />
      <div className="md:block hidden w-full xl:w-[60%]">{children}</div>
      <RightSidebar />
      <div className="hidden sm:block xl:hidden">
        <div
          onClick={() => setOpen(true)}
          className="fixed top-[20%] right-0 dark:bg-black bg-white rounded-l-md p-2 dark:text-white text-black">
          <PiArrowLineLeftFill size={22} />
        </div>
        <Drawer
          className="right-0"
          open={open}
          setOpen={setOpen}
          width="w-[35%]">
          <ProfileSettingForm />
        </Drawer>
      </div>
    </div>
  )
}

export default MessagesLayout
