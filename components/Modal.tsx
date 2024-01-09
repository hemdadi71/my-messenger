import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ModalProps {
  children?: React.ReactNode
  ModalContent: React.ReactNode
  open: boolean
  setOpen: any
}

const Modal: React.FC<ModalProps> = ({
  ModalContent,
  children,
  open,
  setOpen,
}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>{ModalContent}</DialogContent>
      </Dialog>
    </>
  )
}

export default Modal
