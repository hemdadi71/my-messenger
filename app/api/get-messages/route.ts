import dbConnect from '@/libs/dbConnect'
import Message from '@/models/Message'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body
    const messages = await Message.find({ conversationId: id })
    return NextResponse.json(messages)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
