import { getOtp } from '@/Services/authService'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
export type VARIANT = 'GET-OTP' | 'CHECK-OTP'
export default function useResendOtp(setTime: any) {
  const { isPending: resending, mutate: resendOtpMutate } = useMutation({
    mutationFn: getOtp,
    onSuccess: data => {
      toast.success(data?.message)
      setTime(90)
    },
    onError: error => {
      console.log(error)
    },
  })
  return { resending, resendOtpMutate }
}
