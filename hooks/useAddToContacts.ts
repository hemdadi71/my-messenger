import { addToContacts } from '@/Services/contactsService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useAddToContacts() {
  const queryClient = useQueryClient()
  const {
    data,
    isPending,
    mutate: addToContactsMutate,
  } = useMutation({
    mutationFn: addToContacts,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ['get-contacts'] })
      toast.success(message)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data)
    },
  })
  return { data, isPending, addToContactsMutate }
}
