'use client'

import React from 'react'
import Avatar from './Avatar'
import Button from './Button'
import { useDeleteContact } from '@/hooks/useDeleteContact'

interface DeleteContactProps {
  data: any
  setOpen: any
}

const DeleteContact: React.FC<DeleteContactProps> = ({ data, setOpen }) => {
  const { image, _id: id, firstName, lastName, createdAt } = data
  const joinDate = createdAt.split('T')[0].split('-').join('/')
  const { isPending, deleteContactMutate } = useDeleteContact()

  const handleDeleteContact = () => {
    deleteContactMutate({ id }, { onSuccess: () => setOpen(false) })
  }
  return (
    <div className="font-poppin space-y-4">
      <p className="text-center">Are you sure to remove?</p>

      <div className="flex items-center gap-3">
        <Avatar
          imageUrl={image}
          className="w-12 h-12 group-hover:scale-[1.1] addTransition"
        />
        <div className="space-y-2">
          <div className="capitalize flex gap-1 mt-1 text-sm">
            <p>{firstName}</p>
            <p>{lastName}</p>
          </div>
          <div className="text-xs flex items-center gap-1 text-neutral-500">
            <p>Join at</p>
            <p>{joinDate}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button
          type="button"
          title="Cancel"
          primary
          onClick={() => setOpen(false)}
        />
        <Button
          type="button"
          title="Delete"
          danger
          onClick={handleDeleteContact}
          isLoading={isPending}
        />
      </div>
    </div>
  )
}

export default DeleteContact
