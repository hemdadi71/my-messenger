import { FieldValues } from 'react-hook-form'
import http from './httpService'

export function addToContacts(data: FieldValues) {
  return http.post('/add-to-contacts', data).then(({ data }) => data)
}
export function getContacts(data: FieldValues) {
  return http.post('/get-contacts', data).then(({ data }) => data)
}
export function deleteContact(id: FieldValues) {
  return http.post('/delete-contact', id).then(({ data }) => data)
}
