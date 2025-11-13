import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { setAccessToken, setRefreshToken } from '@/utils/tokens'

export async function POST(req: Request) {
  try {
    await dbConnect()

    const body = await req.json()
    const { userName, password } = body
    console.log(body)
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
    const accessToken = setAccessToken({ user })
    const refreshToken = setRefreshToken({ user })
    const seralized: any = [accessToken, refreshToken]

    const success = {
      message: 'Successfully Register',
      user,
    }
    return new NextResponse(JSON.stringify(success), {
      status: 200,
      headers: { 'Set-Cookie': seralized },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
