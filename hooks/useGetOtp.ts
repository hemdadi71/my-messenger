import { getOtp } from '@/Services/authService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import toast from 'react-hot-toast'
export type VARIANT = 'GET-OTP' | 'CHECK-OTP'
export default function useGetOtp() {
  const [variant, setVariant] = useState<VARIANT>('GET-OTP')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { isPending: isLoading, mutate: getOtpMutate } = useMutation({
    mutationFn: getOtp,
    onSuccess: data => {
      toast.success(data?.message)
      setVariant('CHECK-OTP')
      setPhoneNumber(data?.user?.phoneNumber)
    },
    onError: error => {
      console.log(error)
    },
  })
  return { isLoading, variant, phoneNumber, getOtpMutate, setVariant }
}
