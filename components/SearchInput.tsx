import React from 'react'
import Circle from './Circle'
import { IoSearch } from 'react-icons/io5'

import Loading from './Loading'
interface SearchInputProps {
  isLoading: boolean
  id: string
  onChange: any
}

const SearchInput: React.FC<SearchInputProps> = ({
  isLoading,
  id,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex w-full items-center relative">
        <input
          id={id}
          onChange={onChange}
          className="rounded-full w-full py-2 font-poppins px-4 dark:bg-neutral-900 bg-neutral-300 dark:placeholder:text-neutral-300 placeholder:text-neutral-800 bg-opacity-50 outline-none"
          placeholder="Search..."
        />
        <div className="absolute right-2">
          {isLoading && <Loading width={30} height={30} />}
        </div>
      </div>
      <div className="dark:bg-neutral-900 bg-neutral-300 bg-opacity-50 rounded-full p-2.5">
        <IoSearch size={20} />
      </div>
    </div>
  )
}

export default SearchInput
