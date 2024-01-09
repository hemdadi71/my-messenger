import { getContacts } from '@/Services/contactsService'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetContacts(id: string) {
  const { data, isPending } = useQuery({
    queryKey: ['get-contacts', id],
    queryFn: () => getContacts({ id }),
    retry: false,
  })
  return { data, isPending }
}
