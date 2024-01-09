import { ACCESS_TOKEN } from '@/constants'
import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { userName } = body
    const { phoneNumber } = body
    const users = await User.find({})
    const user = users.find(
      user => user?.phoneNumber === phoneNumber || user?.userName === userName
    )
    if (!user) {
      return new NextResponse('User not found', { status: 400 })
    }
    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
