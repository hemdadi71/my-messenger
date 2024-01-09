import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body
    const cookieStore = cookies()
    const { user: data } = cookieVerify(cookieStore)
    const currentUserId = data?.user?._id
    const currentUser = await User.findById(currentUserId)
    const updatedContacts = currentUser.contacts.filter(
      (Id: string) => Id !== id
    )
    const updatedUserContacts = await User.findByIdAndUpdate(
      currentUserId,
      {
        contacts: updatedContacts,
      },
      { new: true }
    )
    const response = {
      message: 'Contact deleted successfully',
      updatedUserContacts,
    }

    return NextResponse.json(response)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
