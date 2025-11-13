import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { ACCESS_TOKEN } from '@/constants'
import { cookieVerify } from '@/utils/tokens'
export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { userName, firstName, lastName, image } = body
    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)
    const id = user?.user?._id
    if (!firstName || !lastName) {
      return new NextResponse('bad request', { status: 401 })
    }
    const users = await User.find({})
    const otherUsers = users.filter(user => user?._id.toString() !== id)
    const existUserName = otherUsers.find(user => user?.userName === userName)
    if (!!existUserName) {
      return new NextResponse('This user name is already used', {
        status: 401,
      })
    }
    const updatedFields = {
      userName,
      firstName,
      lastName,
      image,
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
