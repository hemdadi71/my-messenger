'use client'

import React, { useState } from 'react'
import Avatar from './Avatar'
import Tooltips from './Tooltip'
import { FaTrashAlt } from 'react-icons/fa'
import Modal from './Modal'
import DeleteContact from './DeleteContact'
import AddConversation from './AddConversation'
import { motion } from 'framer-motion'
import { motionDivProps } from '@/framer-motion'
import DynamicText from './DynamicText'
import MobileModal from '@/app/mobile/components/MobileModal'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useAddConversation } from '@/hooks/useAddConversation'
import { useUser } from '@/providers/userProvider'
import { useRouter } from 'next/navigation'
import { useLongPress } from '@uidotdev/usehooks'
import toast from 'react-hot-toast'
const ContactCard = ({ data, isOnline }: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isMobileModal, setIsMobileModalOpen] = useState(false)
  const { isMobile } = useIsMobile()
  const { firstName, lastName, image, createdAt, _id: id } = data || {}
  const joinDate = createdAt.split('T')[0].split('-').join('/')
  const { isPending, addConversationMutate } = useAddConversation()
  const attrs = useLongPress(() => setIsMobileModalOpen(true), {
    threshold: 500,
  })
  const router = useRouter()
  const { user } = useUser()
  const { firstName: currentFirstName, lastName: currentLastName } = user || {}
  const handleAddConversation = () => {
    if (isMobile) {
      const sendData = {
        id,
        isGroup: false,
        name: `${currentFirstName} ${currentLastName} and ${firstName} ${lastName}`,
      }
      addConversationMutate(sendData, {
        onSuccess: ({ conversation }) => {
          router.push(`/mobile/messages/${conversation?._id}`)
          setIsDeleteModalOpen(false)
        },
      })
    }
  }
  return (
    <>
      <motion.div
        {...motionDivProps}
        {...attrs}
        onClick={handleAddConversation}
        className="flex justify-between p-2 group font-poppins border-b dark:border-b-neutral-700 ">
        <div className="flex items-center gap-3">
          <Avatar
            imageUrl={image}
            isOnline={isOnline}
            className="w-12 h-12 group-hover:scale-[1.1] addTransition"
          />
          <div className="space-y-2 pointer-events-none">
            <div className="capitalize md:w-[95%] flex gap-1 mt-1 text-sm overflow-hidden">
              <p>{firstName}</p>
              <p className="truncate">{lastName}</p>
            </div>
            <div className="text-xs flex items-center gap-1 text-neutral-500">
              <p>Join at</p>
              <p>{joinDate}</p>
            </div>
          </div>
        </div>
        <div className="flex-col gap-1 md:flex hidden">
          <Tooltips title="Delete">
            <Modal
              open={isDeleteModalOpen}
              setOpen={setIsDeleteModalOpen}
              ModalContent={
                <DeleteContact data={data} setOpen={setIsDeleteModalOpen} />
              }>
              <FaTrashAlt size={15} />
            </Modal>
          </Tooltips>
          <AddConversation data={data} />
        </div>
        <MobileModal
          open={isMobileModal}
          setOpen={setIsMobileModalOpen}
          height="h-[32%]"
          title="Delete contact">
          <div className="px-4 pb-3">
            <DeleteContact data={data} setOpen={setIsMobileModalOpen} />
          </div>
        </MobileModal>
      </motion.div>
    </>
  )
}

export default ContactCard
