import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { userName } = body
    if (!userName || typeof userName !== 'string') {
      return new NextResponse('User not found', { status: 400 })
    }
    // قبلاً همه‌ی کاربرها خوانده می‌شد (و چون phoneNumber در اسکیما نیست،
    // همیشه اولین کاربر دیتابیس برمی‌گشت). حالا فقط یک کوئری با ایندکس unique
    const user = await User.findOne({ userName }).lean()
    if (!user) {
      return new NextResponse('User not found', { status: 400 })
    }
    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
