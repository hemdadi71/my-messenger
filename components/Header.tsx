import React, { useState } from 'react'
import { Toggler } from './Toggler'
import Logout from './Logout'
import Avatar from './Avatar'
import { useUserOnline } from '@/providers/onlieUserProvider'
import { GiHamburgerMenu } from 'react-icons/gi'
import Drawer from '@/app/mobile/components/Drawer'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { IoSearch } from 'react-icons/io5'
import MobileModal from '@/app/mobile/components/MobileModal'
import AddContact from './AddContact'
import DrawerHeader from '@/app/mobile/components/DrawerHeader'
import DrawerList from '@/app/mobile/components/DrawerList'
interface HeaderProps {
  otherUsers?: any
}

const Header: React.FC<HeaderProps> = ({ otherUsers }) => {
  const { image, firstName, lastName } = otherUsers || {}
  const { usersOnline } = useUserOnline()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const isOnline = usersOnline.length
    ? usersOnline.some((item: any) => item.userId === otherUsers?._id)
    : false
  return (
    <div className="h-20 px-7 border-b dark:border-b-darkBorder relative font-poppins flex items-center justify-between bg-primary dark:bg-[#0D0C22] sm:bg-transparent sm:dark:bg-transparent">
      <div className="font-poppins">
        {otherUsers ? (
          <div className="flex items-center gap-3">
            <div className='sm:hidden block'>
              <FaArrowLeft
                size={25}
                onClick={() => router.back()}
                className="block md:hidden"
              />
            </div>

            <div className="flex items-center gap-3">
              <Avatar
                isOnline={isOnline}
                imageUrl={image}
                className="w-12 h-12"
              />
              <div className="space-y-1">
                <div className="capitalize flex items-center gap-1">
                  <p>{firstName}</p>
                  <p>{lastName}</p>
                </div>
                <div className="text-sm dark:text-neutral-500 text-neutral-400">
                  {isOnline ? (
                    <div className="text-green-500 font-semibold">
                      <p>Online</p>
                    </div>
                  ) : (
                    <p>Last seen recently</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-7">
            <span className="md:hidden block">
              <GiHamburgerMenu size={30} onClick={() => setOpen(true)} />
              <Drawer
                open={open}
                setOpen={setOpen}
                className="left-0"
                width="w-[75%]">
                <DrawerHeader />
                <DrawerList />
              </Drawer>
            </span>
            <div className="flex items-center justify-between">
              <p className="font-bebas text-3xl font-bold">Messenger</p>
              <IoSearch
                size={30}
                className="md:hidden block absolute right-7"
                onClick={() => setOpenModal(true)}
              />
              <MobileModal
                open={openModal}
                setOpen={setOpenModal}
                height="h-[40%]">
                <AddContact setOpen={setOpenModal} />
              </MobileModal>
            </div>
          </div>
        )}
      </div>
      <div className="md:flex items-center gap-4 hidden">
        <Toggler />
        <Logout />
      </div>
    </div>
  )
}

export default Header
