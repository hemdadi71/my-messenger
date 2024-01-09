import dbConnect from '@/libs/dbConnect'
import Conversation from '@/models/Conversation'
import User from '@/models/User'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body

    // Get the user from the cookie
    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)

    // Find the conversation
    const conversation = await Conversation.findOne({
      _id: id,
      users: user.user._id,
    })

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 })
    }

    // Remove the conversation ID from users
    await User.updateMany(
      { _id: { $in: conversation.users } },
      { $pull: { conversations: id } }
    )

    // Delete the conversation
    await Conversation.deleteOne({ _id: id })

    return NextResponse.json({
      success: true,
      message: 'Conversation deleted successfully',
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
