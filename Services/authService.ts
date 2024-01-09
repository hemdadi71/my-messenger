import { FieldValues } from 'react-hook-form'
import http from './httpService'

export function getOtp(data: FieldValues) {
  return http.post('/get-otp', data).then(({ data }) => data)
}
export function checkOtp(data: FieldValues) {
  return http.post('/check-otp', data).then(({ data }) => data)
}
export function isLogin() {
  return http.get('/me').then(({ data }) => data)
}
export function logout() {
  return http.get('/logout').then(({ data }) => data)
}
