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

    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)

    const conversation = await Conversation.findOne({
      _id: id,
      users: user.user._id,
    })

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 404 })
    }

    await User.updateMany(
      { _id: { $in: conversation.users } },
      { $pull: { conversations: id } }
    )

    await Conversation.deleteOne({ _id: id })

    return NextResponse.json({
      success: true,
      message: 'Conversation deleted successfully',
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
