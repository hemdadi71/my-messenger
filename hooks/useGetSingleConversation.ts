import { getSingleConversation } from '@/Services/conversationService'
import { useQuery } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'

export function useGetSingleConversation(id: FieldValues) {
  const { data, isPending } = useQuery({
    queryFn: () => getSingleConversation(id),
    queryKey: ['get-single-conversation', id],
  })
  return { data, isPending }
}
