import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { setAccessToken, setRefreshToken } from '@/utils/tokens'

export async function POST(req: Request) {
  try {
    await dbConnect()

    const { userName, password } = await req.json()

    if (!userName || !password) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const existingUser = await User.findOne({ userName })
    if (existingUser) {
      return new NextResponse('User already exists', { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      userName,
      password: hashedPassword,
    })

    // _id باید در payload باشد؛ بقیه‌ی روت‌ها از user.user._id می‌خوانند
    const payload = { _id: user._id.toString(), userName: user.userName }

    const accessToken = setAccessToken({ user: payload })
    const refreshToken = setRefreshToken({ user: payload })

    // بدون پسورد در پاسخ
    const { password: _password, ...safeUser } = user.toObject()

    const response = NextResponse.json({
      message: 'Successfully Register',
      user: safeUser,
    })

    // این دو مقدار از قبل رشته‌ی کامل Set-Cookie هستند
    response.headers.append('Set-Cookie', accessToken)
    response.headers.append('Set-Cookie', refreshToken)

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
