import { sendMessage } from '@/Services/messageService'
import { useMutation } from '@tanstack/react-query'
export function useSendMessage() {
  const {
    data,
    isPending,
    mutate: sendMessageMutate,
  } = useMutation({
    mutationFn: sendMessage,
    onSuccess: data => {
      // console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })

  return { data, isPending, sendMessageMutate }
}
