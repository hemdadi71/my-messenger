'use client'
import LoginRegisterForm from '@/components/Auth/GetOtpForm'
import Demo from '@/components/Demo'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useState } from 'react'

export default function Home() {
  const { user } = useIsSuccessUser()
  return (
    <>
      <div className="md:bg-[url(/images/wall.jpg)] dark:bg-secondary bg-light bg-cover h-full overflow-hidden font-poppins">
        <LoginRegisterForm />
        {/* <Demo /> */}
      </div>
    </>
  )
}
