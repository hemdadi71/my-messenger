import { deleteContact } from '@/Services/contactsService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteContact() {
  const queryClient = useQueryClient()
  const { isPending, mutate: deleteContactMutate } = useMutation({
    mutationFn: deleteContact,
    onSuccess: data => {
      console.log(data)
queryClient.invalidateQueries({queryKey:['get-contacts']})
    },
  })
  return { isPending, deleteContactMutate }
}
