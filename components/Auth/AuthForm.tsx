'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'
import Button from '../Button'
import OTPInput from 'react-otp-input'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { useTimer } from '@/hooks/useTimer'
import clsx from 'clsx'
import Loading from '../Loading'
import { emailPattern, passwordPattern, userNamePattern } from '@/constants'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

const AuthForm = () => {
  const { isLoading, authMutate, variant, setVariant } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (variant === 'LOGIN') {
      authMutate(data)
    } else {
      const newData = {
        userName: data?.userName,
        password: data?.password,
      }
      authMutate(newData)
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center mt-10 h-full font-poppins dark:text-white text-black">
      <Image src="/icons/messenger.png" width={200} height={200} alt="icon" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-[30%] 2xl:w-[30%] w-full mx-4 px-8 py-2 rounded-lg bg-opacity-70 backdrop-blur-lg flex flex-col gap-2">
        <div className="md:text-neutral-800 md:text-xl 2xl:text-2xl text-lg font-semibold py-2 flex items-center justify-center">
          <p className="dark:text-white">
            {variant === 'LOGIN' ? 'Login' : 'Register'}
          </p>
        </div>
        {variant === 'LOGIN' ? (
          <div className="flex flex-col gap-4">
            <Input
              register={register}
              id="userName"
              required
              type="text"
              errors={errors}
              label="user name"
              pattern={userNamePattern}
              text="Enter valid user name"
            />
            <Input
              register={register}
              id="password"
              required
              type="password"
              errors={errors}
              label="Password"
              pattern={passwordPattern}
              text="Enter valid password"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              register={register}
              id="userName"
              required
              type="text"
              errors={errors}
              label="User name"
              pattern={userNamePattern}
              text="Enter valid user name"
            />
            <Input
              register={register}
              id="password"
              required
              type="password"
              errors={errors}
              label="Password"
              pattern={passwordPattern}
              text="Enter valid password"
            />
            <Input
              register={register}
              id="repeatPassword"
              required
              type="password"
              errors={errors}
              label="Repeat Password"
              pattern={passwordPattern}
              text="Password is not match"
            />
          </div>
        )}
        <Button
          title={variant === 'LOGIN' ? 'Login' : 'Register'}
          isLoading={isLoading}
          primary
        />
      </form>

      <div
        onClick={() => setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
        className="text-sm cursor-pointer text-center mt-4 text-gray-500 hover:text-gray-600 transition">
        {variant === 'LOGIN'
          ? "Don't have an account? Create account"
          : 'Already have an account? Login'}
      </div>
    </div>
  )
}

export default AuthForm
