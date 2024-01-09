'use client'
import { logout } from '@/Services/authService'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import Tooltips from './Tooltip'
import { LuLogOut } from 'react-icons/lu'
const Logout = () => {
  const { push } = useRouter()
  const handleLogout = () => {
    logout().then(({ message }) => {
      push('/')
      toast.success(message)
    })
  }

  return (
    <div onClick={handleLogout}>
      <Tooltips title="Sign out">
        <LuLogOut size={20} />
      </Tooltips>
    </div>
  )
}

export default Logout
