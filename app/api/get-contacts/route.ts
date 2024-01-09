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

    if (!id) {
      return new NextResponse('Invalid request. Missing user id.', {
        status: 400,
      })
    }

    const user = await User.findById(id)
    const contactsIdArray = user?.contacts
    const users = await User.find({})
    const contactsData: any = []

    contactsIdArray.map((contactId: string) => {
      users.forEach(user => {
        if (contactId === user?._id.toString()) {
          contactsData.push(user)
          return
        }
      })
      return null // This line was incorrectly returning `user`, it should be `null`.
    })

    return NextResponse.json(contactsData)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
