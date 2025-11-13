import { FieldValues } from 'react-hook-form'
import http from './httpService'

export function login(data: FieldValues) {
  return http.post('/login', data).then(({ data }) => data)
}
export function register(data: FieldValues) {
  return http.post('/register', data).then(({ data }) => data)
}
export function isLogin() {
  return http.get('/me').then(({ data }) => data)
}
export function logout() {
  return http.get('/logout').then(({ data }) => data)
}
