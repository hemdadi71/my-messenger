import dbConnect from '@/libs/dbConnect'
import Message from '@/models/Message'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body
    await Message.findOneAndDelete({ id })
    const response = {
      message: 'Message Deleted',
    }
    console.log(id)
    return new NextResponse(JSON.stringify(response), { status: 200 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
