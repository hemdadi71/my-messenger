'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import AddContact from './AddContact'
import { IoMdAddCircleOutline } from 'react-icons/io'
import MobileModal from '@/app/mobile/components/MobileModal'

const AddSomeThing = ({ content }: { content: string }) => {
  const [open, setOpen] = useState(false)
  const [openMobileModal, setOpenMobileModal] = useState(false)
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        ModalContent={<AddContact setOpen={setOpen} />}>
        <div
          onClick={() => setOpenMobileModal(true)}
          className="dark:bg-slate-800 bg-slate-300 p-2 rounded-md flex items-center justify-center gap-3 group cursor-pointer md:hover:text-primary">
          <IoMdAddCircleOutline
            className="md:group-hover:rotate-180 addTransition"
            size={30}
          />
          <p className="addTransition">{content}</p>
        </div>
      </Modal>
      <MobileModal
        open={openMobileModal}
        setOpen={setOpenMobileModal}
        title={content}
        height="h-[40%]">
        <AddContact setOpen={setOpenMobileModal} />
      </MobileModal>
    </>
  )
}

export default AddSomeThing
