import http from './httpService'

export function searchUser(data: any) {
  return http.post('/search-user', data).then(res => res)
}
export function completeProfile(data: any) {
  return http.post('/complete-profile', data).then(res => res)
}
export function lastSeenUpdate(data: any) {
  return http.put('/last-seet-update', data).then(res => res)
}
