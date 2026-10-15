// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import { clearAccessToken, clearRefreshToken } from '@/utils/tokens'
import { cookies } from 'next/headers'

export const GET = async () => {
  const cookie = cookies()
  cookie.delete('accessToken')
  cookie.delete('refreshToken')
  const response = NextResponse.json(
    { message: 'Successfully Logout From Account' },
    { status: 200 }
  )
  return response
}
