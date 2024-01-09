'use client'
import React from 'react'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  required?: boolean
  register: any
  errors: FieldErrors
  disabled?: boolean
  pattern: RegExp
  text: string
  defaultValue?: string
}

const Input: React.FC<InputProps> = ({
  id,
  defaultValue,
  label,
  type,
  disabled,
  register,
  required,
  pattern,
  text,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        {...register(id, {
          required,
          pattern: {
            value: pattern,
            message: text,
          },
        })}
        className="
        block
        rounded-full
        px-6
        py-2
        w-full
        text-md
        text-neutral-800
      placeholder:text-neutral-600
      bg-neutral-300
      bg-opacity-80
        appearance-none
        focus:outline-none
        focus:ring-0
        capitalize
        peer
        invalid:border-b-1
        "
        placeholder={label}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm font-semibold pl-2 mt-2">
          {errors[id]?.type === 'required' ? 'This field is required' : text}
        </p>
      )}
    </div>
  )
}

export default Input
