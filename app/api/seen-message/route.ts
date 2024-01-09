import dbConnect from '@/libs/dbConnect'
import Message from '@/models/Message'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { conversationId } = body
    const cookieStore = cookies()
    const { user } = cookieVerify(cookieStore)
    // Update the 'seen' status of messages
    const updatedMessases = await Message.updateMany(
      {
        conversationId,
        senderId: { $ne: user._id }, // Messages where senderId is not equal to the user's _id
        seen: false, // Only update messages that haven't been seen
      },
      { $set: { seen: true } }
    )
    const response = {
      message: 'Messages marked as seen',
      data: updatedMessases,
    }
    return new NextResponse(JSON.stringify(response), { status: 200 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
