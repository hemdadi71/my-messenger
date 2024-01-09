import { FieldValues } from "react-hook-form";
import http from "./httpService";

export function sendMessage(data: FieldValues) {
    return http.post('/send-message', data).then(({ data }) => data)
  }
export function getMessages(id: FieldValues) {
    return http.post('/get-messages', id).then(({ data }) => data)
  }
export function deleteMessage(id: FieldValues) {
    return http.post('/delete-messages', id).then(({ data }) => data)
  }
export function editMessage(data: FieldValues) {
    return http.put('/edit-message', data).then(({ data }) => data)
  }
export function seenMessage(data: FieldValues) {
    return http.put('/seen-message', data).then(({ data }) => data)
  }