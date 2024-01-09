import { setAccessToken, setRefreshToken } from '@/utils/tokens'
import { NextResponse } from 'next/server'

export const GET = async (req: Request, res: Response) => {
  const options = {
    user: null,
    maxAge: -1,
  }
  const Message = {
    message: 'Successfully Logout From Account',
  }
  try {
    const accessToken = setAccessToken(options)
    const refreshToken = setRefreshToken(options)
    const seralized: any = [accessToken, refreshToken]
    return new NextResponse(JSON.stringify(Message), {
      status: 200,
      headers: { 'Set-Cookie': seralized },
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
