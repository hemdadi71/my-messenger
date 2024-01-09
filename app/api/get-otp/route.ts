import dbConnect from '@/libs/dbConnect'
import User from '@/models/User'
import generateRandomNumber from '@/utils/generateRandomNumber'
import { toPersianDigits } from '@/utils/toPersianDigits'
import ResponseCache from 'next/dist/server/response-cache'
import { NextResponse } from 'next/server'
const Kavenegar = require('kavenegar')
const CODE_EXPIRES = 90 * 1000 //90 seconds in miliseconds
export async function POST(req: Request, res: Response) {
  await dbConnect()
  try {
    const body = await req.json()
    let { phoneNumber } = body
    const existingUser = await User.find({ phoneNumber })
    const kaveNegarApi = Kavenegar.KavenegarApi({
      apikey: `${process.env.KAVENEGAR_API_KEY}`,
    })
    const code = generateRandomNumber(6)
    const otp = {
      code,
      expiresIn: Date.now() + CODE_EXPIRES,
    }
    let Response: any = []
    const sendCodePromise = new Promise<void>((resolve, reject) => {
      kaveNegarApi.VerifyLookup(
        {
          receptor: phoneNumber,
          token: code,
          template: 'registerVerify',
        },
        (response: any, status: any) => {
          if (response && status === 200) {
            const success = {
              success: true,
              message: `The code sent to ${phoneNumber}`,
              expiresIn: CODE_EXPIRES,
            }
            Response.push(success)
            resolve()
          } else {
            const error = {
              error: true,
              message: 'The code not send',
            }
            Response.push(error)
            reject()
          }
        }
      )
    })
    await sendCodePromise
    let user
    if (Response[0].success) {
      if (existingUser.length) {
        user = await User.findOneAndUpdate(
          { phoneNumber },
          { $set: { phoneNumber, otp } },
          { new: true }
        )
      } else {
        
        user = await User.create({
          phoneNumber,
          otp,
        })
      }
      Response[0].user = user
    }

    console.log(Response[0].success)
    if (Response[0].success) {
      return NextResponse.json(Response[0])
    }

    return new NextResponse(JSON.stringify(Response[0]), { status: 401 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
