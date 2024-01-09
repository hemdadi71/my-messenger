import dbConnect from '@/libs/dbConnect'
import Message from '@/models/Message'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { text, senderId, fileUrl, conversationId, createdAt, image, id } =
      body

    const message = await Message.create({
      text,
      senderId,
      fileUrl,
      conversationId,
      image,
      createdAt,
      id,
    })
    return NextResponse.json(message)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
