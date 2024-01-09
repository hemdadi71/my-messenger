import { deleteConversation } from '@/Services/conversationService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useDeletConversation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isPending, mutate: deleteConversationMutate } = useMutation({
    mutationFn: deleteConversation,
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['get-conversations'] })
      router.push('/messages')
    },
  })
  return { isPending, deleteConversationMutate }
}
