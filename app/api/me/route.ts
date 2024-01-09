import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { cookieVerify, setAccessToken } from '@/utils/tokens'
import User from '@/models/User'
import dbConnect from '@/libs/dbConnect'


export const GET = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const cookieStore = cookies()
    const { accessToken, refreshToken, secret } = cookieVerify(cookieStore)

    let value: any
    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
        }
      )
    }
    const response = {
      message: 'super top secret user',
      user: {},
    }
    if (!accessToken) {
      value = refreshToken?.value
      const data: any = verify(value, secret)
      const user = data?.user
      const newAccessToken = setAccessToken({ user })
      return new NextResponse(JSON.stringify(response), {
        status: 200,
        headers: { 'Set-Cookie': newAccessToken },
      })
    }
    value = accessToken?.value || ''

    const data: any = verify(value, secret)
    const id = data?.user?._id
    const user = await User.findById(id)
    response.user = user
    return new NextResponse(JSON.stringify(response), {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Somthing went wrong' },
      {
        status: 400,
      }
    )
  }
}
