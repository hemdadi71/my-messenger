import User from '@/models/User'
import dbConnect from '@/libs/dbConnect'
import { setAccessToken, setRefreshToken } from '@/utils/tokens'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
  try {
    await dbConnect()

    const { userName, password } = await req.json()

    if (!userName || !password) {
      return new NextResponse('Username and password are required', {
        status: 400,
      })
    }

    const user = await User.findOne({ userName }).select('+password')

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return new NextResponse('Invalid credentials', { status: 401 })
    }

    const payload = { _id: user._id.toString(), userName: user.userName }

    const accessToken = setAccessToken({ user: payload })
    const refreshToken = setRefreshToken({ user: payload })

    const { password: _password, ...safeUser } = user.toObject()

    const response = NextResponse.json({
      message: 'Successfully Login',
      user: safeUser,
    })

    response.headers.append('Set-Cookie', accessToken)
    response.headers.append('Set-Cookie', refreshToken)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
