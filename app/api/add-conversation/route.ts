import dbConnect from '@/libs/dbConnect'
import Conversation from '@/models/Conversation'
import User from '@/models/User'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id, name, isGroup } = body

    const cookieStore = cookies()
    const tokenData = cookieVerify(cookieStore)
    console.log(tokenData)
    if (!tokenData || !tokenData.user.user._id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const currentUserId = tokenData.user.user._id
    const userIds = [id, currentUserId].filter(Boolean)

    if (userIds.length < 2) {
      return new NextResponse('Invalid user IDs', { status: 400 })
    }

    if (!isGroup) {
      const existingConversation = await Conversation.findOne({
        users: { $all: userIds, $size: 2 },
        isGroup: false,
      })

      if (existingConversation) {
        return new NextResponse(
          JSON.stringify({ conversation: existingConversation, message: 'Conversation already exists' }),
          { status: 200 }
        )
      }
    }

    const conversation = await Conversation.create({
      name: name || null,
      isGroup: !!isGroup,
      users: userIds,
    })

    if (!conversation._id) {
      throw new Error('Failed to create conversation')
    }

    await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { conversations: conversation._id } }
    )

    return NextResponse.json(
      {
        conversation,
        message: 'Conversation created successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: 'Internal Error', details: error.message }),
      { status: 500 }
    )
  }
}