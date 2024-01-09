import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body
    await User.updateOne({ _id: id }, { $set: { lastSeen: new Date() } })
    return NextResponse.json({
      success: true,
      message: 'Last seen updated successfully',
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
