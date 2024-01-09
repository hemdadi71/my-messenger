import { searchUser } from '@/Services/userService'
import { useMutation } from '@tanstack/react-query'

export function useSearchUser() {
  const {
    data,
    isPending,
    mutate: findUserMutate,
  } = useMutation({
    mutationFn: searchUser,
  })
  return { data, isPending, findUserMutate }
}
