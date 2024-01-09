'use client'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import Wellcome from '@/components/Wellcome'
import { useIsMobile } from '@/hooks/useIsMobile'
import useIsSuccessUser from '@/hooks/useIsSuccessUser'
import { useRouter } from 'next/navigation'
import React from 'react'
const MessagePage = () => {
  

  return (
    <div className="font-poppins h-full">
      <Header />
      <div className="h-full flex flex-col items-center mt-24 text-2xl gap-y-36">
        <Wellcome />
        <p className="waving">
          Select from existing conversations{' '}
          <span className="text-primary">Or</span> create an conversation
        </p>
      </div>
    </div>
  )
}

export default MessagePage
