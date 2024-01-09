import { completeProfile } from '@/Services/userService'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useCompleteProfile() {
  const router = useRouter()
  const params = useParams()
  const {
    data,
    isPending,
    mutate: completeProfileMutate,
  } = useMutation({
    mutationFn: completeProfile,
    onSuccess: () => {
      toast.success('Profile data successfully updated')
      if (!params.id) {
        router.push('/messages')
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data)
    },
  })
  return { data, isPending, completeProfileMutate }
}
