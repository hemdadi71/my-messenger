import { getMessages } from '@/Services/messageService'
import { useQuery } from '@tanstack/react-query'
import { FieldValues } from 'react-hook-form'
export function useGetMessages(id: FieldValues) {
  const { data: messages, isPending } = useQuery({
    queryFn: () => getMessages({ id }),
    queryKey: ['get-messages', id],
  })
  return { messages, isPending }
}
