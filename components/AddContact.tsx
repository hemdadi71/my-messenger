'use client'

import React, { useState } from 'react'
import SearchInput from './SearchInput'
import { debounce } from 'lodash'
import FindedUser from './FindedUser'
import NotFoundUser from './NotFoundUser'
import { phoneNumberPattern } from '@/constants'
import { useSearchUser } from '@/hooks/useUser'
import { AnimatePresence } from 'framer-motion'

const AddContact = ({ setOpen }: { setOpen: any }) => {
  const { data, isPending, findUserMutate } = useSearchUser()
  const [value, setValue] = useState('')
  const handleInputChange = debounce((inputValue: string) => {
    if (inputValue) {
      const isPhoneNumber = phoneNumberPattern.test(inputValue)
      const sentData = isPhoneNumber
        ? { phoneNumber: inputValue }
        : { userName: inputValue }
      setValue(inputValue)
      findUserMutate(sentData)
    }
  }, 2000)
  return (
    <>
      <div className="p-2 font-poppins flex flex-col gap-3">
        <div className="text-center text-xl">
          <p>Find your friends</p>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e.target.value)
            }}
            isLoading={isPending}
            id="Search"
          />
          <p className="text-sm text-primary pl-1">
            Find by phone number or user name
          </p>
        </div>
        <AnimatePresence>
          {!isPending && data ? (
            <FindedUser data={data?.data} setOpen={setOpen} />
          ) : (
            value && !isPending && <NotFoundUser />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default AddContact
