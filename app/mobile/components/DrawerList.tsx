'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { PiUserGearFill } from 'react-icons/pi'
import { RiContactsBookFill } from 'react-icons/ri'
import { logout } from '@/Services/authService'
import toast from 'react-hot-toast'
const DrawerList = () => {
  const { push } = useRouter()
  const handleLogout = () => {
    logout().then(({ message }) => {
      push('/')
      toast.success(message)
    })
  }
  return (
    <div className="flex flex-col p-5 gap-6">
      <Link
        href="/mobile/completeProfile"
        className="flex items-center gap-5 font-poppins">
        <PiUserGearFill size={25} />
        <p className="text-md font-semibold">Profile setting</p>
      </Link>
      <Link
        href="/mobile/contacts"
        className="flex items-center gap-5 font-poppins">
        <RiContactsBookFill size={25} />
        <p className="text-md font-semibold">Contacts</p>
      </Link>
      <div
        onClick={handleLogout}
        className="flex items-center gap-5 font-poppins">
        <LuLogOut size={25} className='rotate-180' />
        <p className="text-md font-semibold">Sign out</p>
      </div>
    </div>
  )
}

export default DrawerList
