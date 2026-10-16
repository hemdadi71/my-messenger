import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, res: Response) => {
  await dbConnect()
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return new NextResponse('Invalid request. Missing user id.', {
        status: 400,
      })
    }

    const user: any = await User.findById(id).lean()
    const contactsIdArray: string[] = (user?.contacts || []).map(String)
    const validIds = contactsIdArray.filter(contactId =>
      mongoose.isValidObjectId(contactId)
    )

    // قبلاً کل کاربرها خوانده می‌شد؛ حالا فقط مخاطب‌ها
    const found: any[] = validIds.length
      ? await User.find({ _id: { $in: validIds } }).lean()
      : []

    // ترتیب خروجی مثل قبل: به ترتیب آرایه‌ی contacts
    const byId = new Map<string, any>(found.map(u => [u._id.toString(), u]))
    const contactsData = contactsIdArray
      .map(contactId => byId.get(contactId))
      .filter(Boolean)

    return NextResponse.json(contactsData)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
