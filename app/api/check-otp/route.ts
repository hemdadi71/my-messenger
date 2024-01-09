import User from '@/models/User'
import { setAccessToken, setRefreshToken } from '@/utils/tokens'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { phoneNumber, otp } = body
    const users = await User.find({ phoneNumber })

    if (users.length === 0) {
      return new NextResponse('User not found', { status: 401 })
    }
    const user = users[0]
    if (new Date(`${user.otp.expiresIn}`).getTime() < Date.now()) {
      return new NextResponse('Code is expired', { status: 401 })
    }
    const isValidCode = user.otp.code === +otp

    const accessToken = setAccessToken({ user })
    const refreshToken = setRefreshToken({ user })
    const seralized: any = [accessToken, refreshToken]
    if (isValidCode) {
      const success = {
        message: 'Code successfully confirmed',
        user,
      }
      return new NextResponse(JSON.stringify(success), {
        status: 200,
        headers: { 'Set-Cookie': seralized },
      })
    } else {
      return new NextResponse('Invalid code', { status: 401 })
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
