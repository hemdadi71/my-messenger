import User from '@/models/User'
import { setAccessToken, setRefreshToken } from '@/utils/tokens'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { userName,password } = body
    const users = await User.find({ userName })

    if (users.length === 0) {
      return new NextResponse('User not found', { status: 401 })
    }
    const user = users[0]

    const accessToken = setAccessToken({ user })
    const refreshToken = setRefreshToken({ user })
    const seralized: any = [accessToken, refreshToken]

    const success = {
      message: 'Successfully Login',
      user,
    }
    return new NextResponse(JSON.stringify(success), {
      status: 200,
      headers: { 'Set-Cookie': seralized },
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
