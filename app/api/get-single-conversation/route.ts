import dbConnect from '@/libs/dbConnect'
import Conversation from '@/models/Conversation'
import User from '@/models/User'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json() // Assuming you pass the conversationId as a query parameter
    const { conversationId } = body
    // Validate if conversationId is provided
    if (!conversationId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Conversation ID is required',
        }),
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)
    const id = user.user._id

    // Fetch user and populate the specified conversation
    const dataBaseUser = await User.findById(id).populate({
      path: 'conversations',
      match: { _id: conversationId },
      populate: {
        path: 'users',
        select: 'userName image firstName lastName lastSeen', // Select the fields you want to retrieve
      },
    })

    if (!dataBaseUser) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'User not found' })
      )
    }

    const singleConversation = dataBaseUser.conversations.find(
      (conversation: any) => conversation._id.toString() === conversationId
    )

    if (!singleConversation) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Conversation not found' }),
        { status: 404 }
      )
    }

    // Extract information about other users in the conversation
    const otherUsers = singleConversation.users.filter(
      (u: any) => u._id.toString() !== id
    )

    return NextResponse.json({
      success: true,
      singleConversation: {
        conversationId: singleConversation._id,
        conversationName: singleConversation.name,
        otherUsers,
      },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
