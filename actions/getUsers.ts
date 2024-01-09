import http from '@/Services/httpService'
import { AxiosError } from 'axios'

interface UserRespons {
  user: any | null
  error: AxiosError | null
}

export async function getUsers(): Promise<UserRespons> {
  try {
    const { data } = await http.get('/me')
    return {
      user: data,
      error: null,
    }
  } catch (err) {
    const error = err as AxiosError
    return { user: null, error: error }
  }
}
