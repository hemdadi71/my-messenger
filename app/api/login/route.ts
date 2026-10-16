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

    // password در اسکیما select:false است، پس باید صریحاً خواسته شود
    const user = await User.findOne({ userName }).select('+password')

    // یک پیام یکسان برای «کاربر نیست» و «رمز اشتباه است»
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return new NextResponse('Invalid credentials', { status: 401 })
    }

    // _id باید در payload باشد؛ بقیه‌ی روت‌ها از user.user._id می‌خوانند
    const payload = { _id: user._id.toString(), userName: user.userName }

    const accessToken = setAccessToken({ user: payload })
    const refreshToken = setRefreshToken({ user: payload })

    // بدون پسورد در پاسخ
    const { password: _password, ...safeUser } = user.toObject()

    const response = NextResponse.json({
      message: 'Successfully Login',
      user: safeUser,
    })

    // این دو مقدار از قبل رشته‌ی کامل Set-Cookie هستند
    response.headers.append('Set-Cookie', accessToken)
    response.headers.append('Set-Cookie', refreshToken)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
