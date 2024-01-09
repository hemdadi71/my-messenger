'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Image from 'next/image'
import Button from '../Button'
import OTPInput from 'react-otp-input'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'
import useGetOtp from '@/hooks/useGetOtp'
import useCheckOtp from '@/hooks/useCheckOtp'
import { useTimer } from '@/hooks/useTimer'
import clsx from 'clsx'
import useResendOtp from '@/hooks/useResendOtp'
import Loading from '../Loading'
import { phoneNumberPattern } from '@/constants'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

const GetOtpForm = () => {
  const [otp, setOtp] = useState('')

  const { isLoading, getOtpMutate, variant, phoneNumber, setVariant } =
    useGetOtp()
  const { isPending, checkOtpMutate } = useCheckOtp()
  const { time, setTime } = useTimer(variant)
  const { resendOtpMutate } = useResendOtp(setTime)
  const [resending, setResending] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (variant === 'GET-OTP') {
      getOtpMutate(data)
    } else {
      const newData = { ...data, otp }
      checkOtpMutate(newData)
    }
  }
  const handleResendOtp = () => {
    setResending(true)
    resendOtpMutate(
      { phoneNumber },
      {
        onSuccess: () => setResending(false),
      }
    )
  }

  return (
    <div className="flex flex-col gap-6 items-center mt-10 h-full font-poppins dark:text-white text-black">
      <Image src="/icons/messenger.png" width={200} height={200} alt="icon" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-[30%] 2xl:w-[30%] w-full mx-4 px-8 py-2 rounded-lg bg-opacity-70 backdrop-blur-lg flex flex-col gap-2">
        <div className="md:text-neutral-800 md:text-xl 2xl:text-2xl text-lg font-semibold py-2 flex items-center justify-center">
          <p>
            {variant === 'GET-OTP'
              ? 'Please enter your phone number'
              : 'Confirm the code sent'}
          </p>
        </div>
        {variant === 'GET-OTP' ? (
          <>
            <Input
              register={register}
              id="phoneNumber"
              required
              type="text"
              errors={errors}
              label="Phone number"
              pattern={phoneNumberPattern}
              text="Enter valid phone number"
            />
            <Button title="Login" isLoading={isLoading} primary />
          </>
        ) : (
          <>
            <div className="flex items-center justify-center my-3 text-white">
              <div
                onClick={() => {
                  setVariant('GET-OTP')
                  setTime(90)
                  setResending(false)
                }}
                className="rounded-md cursor-pointer hover:bg-purple-800 addTransition py-1 px-2 bg-primary dark:text-white text-black flex items-center gap-2">
                <div className="flex items-center justify-center mb-1">
                  <FaEdit size={18} />
                </div>
                <div className="flex items-center">
                  <span>{formatPhoneNumber(phoneNumber)}</span>
                </div>
              </div>
            </div>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              renderSeparator={<span className="text-white">-</span>}
              renderInput={(props: any) => <input type="number" {...props} />}
              containerStyle="flex gap-x-2 justify-center"
              inputStyle="!w-[2.2rem] !h-[2.2rem] px-[0.5rem] py-[0.2rem] bg-neutral-200 font-poppins text-neutral-800 rounded-md focus:scale-[1.2] outline-none addTransition"
            />
            <div className="flex items-center justify-center my-2">
              <button
                disabled={time !== 0}
                onClick={handleResendOtp}
                className="rounded-md cursor-pointer hover:bg-purple-800 addTransition py-1 px-2 bg-primary dark:text-white text-black flex items-center gap-2">
                {resending ? (
                  <Loading width={30} height={30} />
                ) : (
                  <p
                    className={clsx(
                      'addTransition',
                      time === 0
                        ? 'text-white hover:text-red-400'
                        : 'line-through'
                    )}>
                    Resend
                  </p>
                )}
                <span>{time}</span>
              </button>
            </div>
            <Button
              type="submit"
              title="Confirm"
              isLoading={isPending || isLoading}
              primary
            />
          </>
        )}
      </form>
    </div>
  )
}

export default GetOtpForm
