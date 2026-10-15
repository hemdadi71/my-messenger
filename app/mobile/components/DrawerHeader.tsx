'use client'

import Avatar from '@/components/Avatar'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import React from 'react'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { Toggler } from '@/components/Toggler'
import { useUser } from '@/providers/userProvider'
const DrawerHeader = () => {
  const { user } = useUser()
  const { firstName, lastName, image, phoneNumber } = user || {}
  return (
    <>
      <div className="w-full dark:bg-[#0D0C22] bg-primary flex px-4 pt-6 pb-3 dark:text-neutral-200 text-neutral-800 justify-between">
        <div className="flex flex-col items-start gap-1">
          <Avatar imageUrl={image} className="w-14 h-14" />
          <div className='pl-1'>
            <div className="flex items-center capitalize gap-1">
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
          </div>
        </div>
        <div>
          <Toggler />
        </div>
      </div>
    </>
  )
}

export default DrawerHeader
