import { FieldValues } from 'react-hook-form'
import http from './httpService'

export function addConversation(data: FieldValues) {
  return http.post('/add-conversation', data).then(({ data }) => data)
}
export function getConversations() {
  return http.get('/get-conversations').then(({ data }) => data)
}
export function deleteConversation( id : FieldValues) {
  return http.post('/delete-conversation', id).then(({ data }) => data)
}
export function getSingleConversation( id : FieldValues) {
  return http.post('/get-single-conversation', id).then(({ data }) => data)
}
