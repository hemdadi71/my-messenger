import { useEffect, useState } from 'react'

export function useHyderation(user = {}) {
  const [isMount, setIsMount] = useState(false)
  useEffect(() => {
    setIsMount(true)
  }, [user])
  return { isMount }
}
