import dbConnect from '@/libs/dbConnect'
import Message from '@/models/Message'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body
    // sort روی _id (ترتیب ساخت) + lean: سریع‌تر و با ایندکس {conversationId, _id}
    const messages = await Message.find({ conversationId: id })
      .sort({ _id: 1 })
      .lean()
    return NextResponse.json(messages)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
