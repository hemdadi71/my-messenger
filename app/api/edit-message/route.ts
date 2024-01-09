import dbConnect from '@/libs/dbConnect'
import Message from '@/models/Message'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { data } = body
    const { id } = data
    const updatedMessages = await Message.findOneAndUpdate({ id }, data, {
      new: true,
    })
    console.log(updatedMessages)
    return NextResponse.json(updatedMessages)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
