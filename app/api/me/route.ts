import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { getAuthCookies, setAccessToken } from '@/utils/tokens'
import User from '@/models/User'
import dbConnect from '@/libs/dbConnect'

export const dynamic = 'force-dynamic'

const unauthorized = () =>
  NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

export const GET = async () => {
  try {
    await dbConnect()

    const cookieStore = await cookies()
    const { accessToken, refreshToken, secret } = getAuthCookies(cookieStore)

    if (!accessToken?.value && !refreshToken?.value) {
      return unauthorized()
    }

    // 1) access token معتبر
    if (accessToken?.value) {
      try {
        const data: any = verify(accessToken.value, secret)
        const user = await User.findById(data?.user?._id).select('-password')
        if (user) {
          return NextResponse.json({ message: 'super top secret user', user })
        }
      } catch {
        // منقضی/نامعتبر: می‌رویم سراغ refresh token
      }
    }

    // 2) refresh token: access token جدید می‌سازیم
    if (!refreshToken?.value) return unauthorized()

    let data: any
    try {
      data = verify(refreshToken.value, secret)
    } catch {
      return unauthorized()
    }

    const user = await User.findById(data?.user?._id).select('-password')
    if (!user) return unauthorized()

    const newAccessToken = setAccessToken({
      user: { _id: user._id.toString(), userName: user.userName },
    })

    const response = NextResponse.json({
      message: 'super top secret user',
      user,
    })
    response.headers.append('Set-Cookie', newAccessToken)
    return response
  } catch (error) {
    console.error('Me route error:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
