import { addConversation } from '@/Services/conversationService'
import { useRightSidebar } from '@/providers/SidebarProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function useAddConversation() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { contentDispatch } = useRightSidebar()
  const {
    data,
    isPending,
    mutate: addConversationMutate,
  } = useMutation({
    mutationFn: addConversation,
    mutationKey: ['add-conversation'],
    onSuccess: ({ message, conversation }) => {
      contentDispatch('CONVERSATIONSLIST')
      queryClient.invalidateQueries({ queryKey: ['get-conversations'] })
      router.push(`/messages/${conversation?._id}`)
      toast.success(message)
    },
    onError: (error: any) => console.log(error),
  })
  return { data, isPending, addConversationMutate }
}
