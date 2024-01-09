import { getConversations } from '@/Services/conversationService'
import { useQuery } from '@tanstack/react-query'

export function useGetConversations(
  id: string,
  content: string = 'CONVERSATIONSLIST'
) {
  const { data: conversations, isPending } = useQuery({
    queryKey: ['get-conversations', id, content],
    queryFn: getConversations,
  })
  return { conversations, isPending }
}
