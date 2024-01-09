'use client'

import ProfileSettingForm from '@/components/ProfileSettingForm'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { mobilePageMotion } from '@/framer-motion'
const MobileCompleteProfilePage = () => {
  const router = useRouter()
  return (
    <motion.div
      {...mobilePageMotion}
      className="w-full h-full dark:bg-secondary bg-light justify-center font-poppins">
      <div className="flex items-center gap-5 bg-primary dark:bg-[#0D0C22] h-20 px-6">
        <FaArrowLeft
          size={25}
          onClick={() => router.back()}
          className="block md:hidden"
        />
        <p className="font-semibold text-xl">Profile setting</p>
      </div>
      <div className="py-5 px-12">
        <ProfileSettingForm />
      </div>
    </motion.div>
  )
}

export default MobileCompleteProfilePage
