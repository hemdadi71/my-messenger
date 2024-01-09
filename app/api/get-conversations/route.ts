import dbConnect from '@/libs/dbConnect'
import Conversation from '@/models/Conversation'
import User from '@/models/User'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)
    const id = user.user._id
    // Fetch user and populate the conversations field
    const dataBaseUser = await User.findById(id).populate({
      path: 'conversations',
      populate: {
        path: 'users',
        select: 'userName image firstName lastName lastSeen', // Select the fields you want to retrieve
      },
    })

    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'User not found' })
      )
    }

    const userConversations = dataBaseUser.conversations
    // Extract information about other users in each conversation
    const conversationsData = userConversations.map((conversation: any) => {
      const otherUsers = conversation.users.filter(
        (u: any) => u._id.toString() !== id
      )
      return {
        conversationId: conversation._id,
        conversationName: conversation.name,
        otherUsers,
      }
    })

    return NextResponse.json({
      success: true,
      conversationsData,
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
