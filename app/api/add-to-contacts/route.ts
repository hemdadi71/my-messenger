import { getUsers } from '@/actions/getUsers'
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
    const { id } = body
    const cookieStore = cookies()
    const accessToken = cookieStore.get(ACCESS_TOKEN)
    const secret = process.env.JWT_SECRET || ''
    const value = accessToken?.value || ''
    const data: any = verify(value, secret)
    const currentUserId = data?.user?._id
    const currentUser = await User.findById(currentUserId)
    const existingContact = currentUser.contacts.find(
      (contactId: string) => contactId === id
    )
    if (existingContact) {
      return new NextResponse('User already exist in your contacts', {
        status: 401,
      })
    }
    currentUser.contacts.push(id)
    const updatedUser = await User.findByIdAndUpdate(
      currentUserId,
      currentUser,
      { new: true }
    )
    const response = {
      message: 'Contact added successfully',
      updatedUser,
    }
    return new NextResponse(JSON.stringify(response))
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
