import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import { cookieVerify } from '@/utils/tokens'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface PopulatedUser {
  _id: mongoose.Types.ObjectId
  conversations: Array<{
    _id: mongoose.Types.ObjectId
    name: string | null
    isGroup: boolean
    users: Array<{
      _id: mongoose.Types.ObjectId
      userName: string
      image: string
      firstName: string
      lastName: string
      lastSeen: Date
    }>
    updatedAt: Date
  }>
}

export const GET = async (req: Request) => {
  await dbConnect()
  try {
    const cookieStore = cookies()
    const tokenData = cookieVerify(cookieStore)

    if (!tokenData || !tokenData.user || !tokenData.user.user._id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const currentUserId = tokenData.user.user._id.toString()

    const dataBaseUser = await User.findById(currentUserId)
      .populate({
        path: 'conversations',
        populate: {
          path: 'users',
          select: 'userName image firstName lastName lastSeen',
        },
      })
      .lean<PopulatedUser>()

    if (!dataBaseUser) {
      return new NextResponse('User not found', { status: 404 })
    }

    const conversationsData = (dataBaseUser.conversations || []).map(conv => {
      const otherUsers = conv.users
        .filter(u => u._id.toString() !== currentUserId)
        .map(u => ({
          _id: u._id.toString(),
          userName: u.userName,
          image: u.image,
          firstName: u.firstName,
          lastName: u.lastName,
          lastSeen: u.lastSeen,
        }))

      return {
        conversationId: conv._id.toString(),
        conversationName: conv.name,
        isGroup: conv.isGroup,
        otherUsers,
        lastMessageAt: conv.updatedAt,
      }
    })
    return NextResponse.json({
      success: true,
      conversations: conversationsData,
    })
  } catch (error: any) {
    console.error('GET /api/conversation error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Error', details: error.message }),
      { status: 500 },
    )
  }
}
