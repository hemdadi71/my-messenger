import { editMessage } from '@/Services/messageService'
import { useMutation } from '@tanstack/react-query'

export function useEditMessages() {
  const { isPending, mutate: editMessageMutate } = useMutation({
    mutationFn: editMessage,
    mutationKey: ['edit-message'],
    onSuccess: data => {
      console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })
  return { isPending, editMessageMutate }
}
