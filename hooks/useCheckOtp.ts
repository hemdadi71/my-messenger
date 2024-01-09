import { checkOtp, getOtp } from '@/Services/authService'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useIsMobile } from './useIsMobile'
export default function useCheckOtp() {
  const router = useRouter()
  const { isMobile } = useIsMobile()
  const { isPending, mutate: checkOtpMutate } = useMutation({
    mutationFn: checkOtp,
    onSuccess: data => {
      const { user } = data
      if (!user?.firstName || !user?.lastName) {
        if (isMobile) {
          router.push('/mobile/completeProfile')
          return
        }
        router.push('/completeProfile')
        return
      }
      if (isMobile) {
        router.push('/mobile/messages')
        return
      }
      router.push('/messages')
      toast.success(data?.message)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data)
    },
  })
  return { isPending, checkOtpMutate }
}
