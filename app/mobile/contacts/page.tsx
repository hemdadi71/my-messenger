'use client'

import ContactsList from '@/components/ContactsList'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { mobilePageMotion } from '@/framer-motion'
const MobileContactsPage = () => {
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
        <p className="font-semibold text-xl">Contacts</p>
      </div>
      <div className="px-3 py-1">
        <ContactsList />
      </div>
    </motion.div>
  )
}

export default MobileContactsPage
