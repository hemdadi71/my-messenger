import { seenMessage } from '@/Services/messageService'
import { useMutation } from '@tanstack/react-query'

export function useSeenMessage() {
  const { isPending, mutate: seenMessageMutate } = useMutation({
    mutationFn: seenMessage,
    mutationKey: ['seen-message'],
  })
  return { seenMessageMutate, isPending }
}
