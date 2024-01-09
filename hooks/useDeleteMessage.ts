import { deleteMessage } from '@/Services/messageService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteMessage() {
  const { mutate: deleteMesageMutate, isPending } = useMutation({
    mutationFn: deleteMessage,
    mutationKey: ['delete-message'],
    onSuccess: () => {
      toast.success('Message Deleted')
    },
    onError: error => {
      console.log(error)
    },
  })
  return { deleteMesageMutate, isPending }
}
