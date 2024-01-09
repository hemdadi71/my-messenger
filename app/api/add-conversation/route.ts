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
    const { id, name, isGroup } = body
    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)
    const currentUserId = user.user._id
    const userIds = [id, currentUserId]
    // Check if a conversation with the same set of users already exists
    const existingConversation = await Conversation.findOne({
      users: { $all: userIds },
    })

    if (existingConversation) {
      // If conversation already exists, return it instead of creating a new one
      return new NextResponse('Conversation already exist', { status: 401 })
    }
    // Create a new conversation
    const conversation = await Conversation.create({
      name,
      isGroup,
      users: userIds,
    })

    // Update the users with the new conversation
    await User.updateMany(
      { _id: { $in: userIds } },
      { $push: { conversations: conversation._id } }
    )
    const data = {
      conversation,
      message: 'Conversation created',
    }

    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
