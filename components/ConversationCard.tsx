import React, { useRef, useState } from 'react'
import Avatar from './Avatar'
import Tooltips from './Tooltip'
import Modal from './Modal'
import { FaTrashAlt } from 'react-icons/fa'
import DeleteConversation from './DeleteConversation'
import { motion } from 'framer-motion'
import { motionDivProps } from '@/framer-motion'
import clsx from 'clsx'
import { useParams, useRouter } from 'next/navigation'
import MobileModal from '@/app/mobile/components/MobileModal'
import { useTouch } from '@/hooks/useTouch'
import { useLongPress } from '@uidotdev/usehooks'
const ConversationCard = ({
  conversation,
  conversationId,
  user,
  isOnline,
  isMobile,
}: any) => {
  const { firstName, lastName, image } = conversation || {}
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileModal, setIsMobileModalOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const attrs = useLongPress(() => setIsMobileModalOpen(true), {
    threshold: 500,
  })
  const isActive = params.id === conversationId
  const handleGoToMessages = () => {
    if (isMobile) {
      return router.push(`/mobile/messages/${conversationId}`)
    } else {
      return router.push(`/messages/${conversationId}`)
    }
  }

  return (
    <>
      <motion.div
        {...motionDivProps}
        className={clsx(
          ' dark:hover:bg-slate-800 hover:bg-slate-300 hover:rounded-lg border-b dark:border-b-neutral-700 hover:border-b-0',
          isActive
            ? 'dark:bg-slate-800 bg-slate-300 rounded-md border-b-0'
            : 'bg-transparent'
        )}>
        <div
          onClick={handleGoToMessages}
          {...attrs}
          className="flex items-center gap-3 p-2 cursor-pointer addTransition ">
          <Avatar isOnline={isOnline} imageUrl={image} className="w-12 h-12" />
          <div className="flex justify-between w-full relative">
            <div className="space-y-2">
              <div className="capitalize md:w-[95%] flex gap-1 mt-1 text-sm">
                <p>{firstName}</p>
                <p className="truncate">{lastName}</p>
              </div>
              <div className="text-xs flex items-center gap-1 text-neutral-500">
                {isOnline ? (
                  <div className="text-green-500 font-semibold">
                    <p>Online</p>
                  </div>
                ) : (
                  <>
                    <p>Last seen </p>
                    <p className="font-bold">recently</p>
                  </>
                )}
              </div>
            </div>
            <div className="md:block hidden absolute right-0">
              <Tooltips title="Delete">
                <Modal
                  open={isOpen}
                  setOpen={setIsOpen}
                  ModalContent={
                    <DeleteConversation
                      conversationId={conversationId}
                      user={user}
                      setIsOpen={setIsOpen}
                      isOnline={isOnline}
                    />
                  }>
                  <FaTrashAlt size={15} />
                </Modal>
              </Tooltips>
            </div>
          </div>
        </div>
      </motion.div>
      <MobileModal
        open={isMobileModal}
        setOpen={setIsMobileModalOpen}
        title="Delete Conversation"
        height="h-[30%]">
        <div className="flex items-center justify-center">
          <DeleteConversation
            conversationId={conversationId}
            user={user}
            setIsOpen={setIsMobileModalOpen}
            isOnline={isOnline}
          />
        </div>
      </MobileModal>
    </>
  )
}

export default ConversationCard
