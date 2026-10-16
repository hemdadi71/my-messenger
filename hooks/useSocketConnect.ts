import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

import { getSingleConversation } from '@/Services/conversationService'
import { useUser } from '@/providers/userProvider'
import { useUserOnline } from '@/providers/onlieUserProvider'

// اتصال‌های فعال همین تب مرورگر
const connectedSockets = new Set<Socket>()

export function useSocketConnection(
  roomName: string,
  roomId?: string | string[],
) {
  const [socket] = useState(() =>
    io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
    }),
  )

  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  const { user } = useUser()
  const { usersOnlineDispatch } = useUserOnline()

  const userId = user?._id
  const id = Array.isArray(roomId) ? roomId[0] : roomId

  // مدیریت اتصال و وضعیت آنلاین
  useEffect(() => {
    const receiveUsers = (users: any) => {
      usersOnlineDispatch(Array.isArray(users) ? users : [])
    }

    const connected = () => {
      connectedSockets.add(socket)

      // در صفحهٔ چت هم کاربر آنلاین ثبت می‌شود.
      // پس از reconnect نیز دوباره اجرا می‌شود.
      if (userId) {
        socket.emit('new-user-add', String(userId))
      }
    }

    const disconnected = () => {
      connectedSockets.delete(socket)

      // بسته شدن یک اتصال فرعی نباید
      // فهرست آنلاین‌ها را پاک کند.
      if (connectedSockets.size === 0) {
        usersOnlineDispatch([])
      }
    }

    // قبل از اتصال و ثبت کاربر، listener آماده است.
    socket.on('get-users', receiveUsers)
    socket.on('connect', connected)
    socket.on('disconnect', disconnected)

    if (socket.connected) {
      connected()
    }

    socket.connect()

    return () => {
      socket.disconnect()
      connectedSockets.delete(socket)

      socket.off('get-users', receiveUsers)
      socket.off('connect', connected)
      socket.off('disconnect', disconnected)
    }
  }, [socket, userId, usersOnlineDispatch])

  // مدیریت رویدادهای گفتگو و پیام
  useEffect(() => {
    if (!id || !roomName) return

    let active = true

    const refreshConversations = () => {
      void queryClient.invalidateQueries({
        queryKey: ['get-conversations'],
      })
    }

    const refreshMessages = (data: { conversationId: string }) => {
      void queryClient.invalidateQueries({
        queryKey: ['get-messages', data.conversationId],
      })
    }

    const deleted = (data: { id: string }) => {
      refreshConversations()

      if (roomName === 'join_room' && data.id === id) {
        queryClient.removeQueries({
          queryKey: ['get-messages', id],
        })

        router.replace(
          pathname.startsWith('/mobile') ? '/mobile/messages' : '/messages',
        )
      }
    }

    const join = () => {
      if (roomName !== 'join_room') {
        // ثبت آنلاین بودن در effect بالایی انجام شد.
        if (roomName !== 'new-user-add') {
          socket.emit(roomName, id)
        }

        refreshConversations()
        return
      }

      socket.emit('join_room', id, () => {
        if (!active) return

        refreshMessages({
          conversationId: id,
        })

        refreshConversations()

        // بررسی حذف گفتگو هنگام قطع اتصال
        void getSingleConversation({
          conversationId: id,
        }).catch(error => {
          if (active && error?.response?.status === 404) {
            deleted({ id })
          }
        })
      })
    }

    socket.on('messages-changed', refreshMessages)

    socket.on('conversations-changed', refreshConversations)

    socket.on('conversation-deleted', deleted)

    socket.on('connect', join)

    if (socket.connected) {
      join()
    }

    return () => {
      active = false

      socket.off('messages-changed', refreshMessages)

      socket.off('conversations-changed', refreshConversations)

      socket.off('conversation-deleted', deleted)

      socket.off('connect', join)

      if (roomName === 'join_room' && socket.connected) {
        socket.emit('leave_room', id)
      }
    }
  }, [socket, roomName, id, queryClient, router, pathname])

  return { socket }
}
