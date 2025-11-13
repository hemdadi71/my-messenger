// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import { clearAccessToken, clearRefreshToken } from '@/utils/tokens'

export const GET = async () => {
  const response = NextResponse.json(
    { message: 'Successfully Logout From Account' },
    { status: 200 }
  )

  // Set-Cookie به صورت آرایه
  response.headers.append('Set-Cookie', clearAccessToken())
  response.headers.append('Set-Cookie', clearRefreshToken())

  return response
}