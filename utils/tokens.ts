import {
  ACCESS_MAX_AGE,
  ACCESS_TOKEN,
  REFRESH_MAX_AGE,
  REFRESH_TOKEN,
} from '@/constants'
import { serialize } from 'cookie'
import { sign, verify } from 'jsonwebtoken'

interface SetToken {
  user: any
  maxAge?: any
}

// تابع کمکی برای گرفتن تنظیمات کوکی
const getCookieOptions = (maxAge?: number) => {
  const options: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    priority: 'medium',
  }
  
  // فقط اگر domain تعریف شده باشد اضافه کن
  if (process.env.COOKIE_DOMAIN) {
    options.domain = process.env.COOKIE_DOMAIN
  }
  
  if (maxAge !== undefined) {
    options.maxAge = maxAge
  }
  
  return options
}

export function setAccessToken({ user, maxAge = ACCESS_MAX_AGE }: SetToken) {
  const secret = process.env.JWT_SECRET || ''

  const token = sign(
    {
      user,
    },
    secret,
    {
      expiresIn: '2d',
    }
  )

  const accessTokenSerialize = serialize(
    ACCESS_TOKEN, 
    token, 
    getCookieOptions(maxAge)
  )
  return accessTokenSerialize
}

export function setRefreshToken({ user, maxAge = REFRESH_MAX_AGE }: SetToken) {
  const secret = process.env.JWT_SECRET || ''
  const token = sign(
    {
      user,
    },
    secret,
    {
      expiresIn: '1y',
    }
  )

  const refreshTokenSerialize = serialize(
    REFRESH_TOKEN, 
    token, 
    getCookieOptions(maxAge)
  )
  return refreshTokenSerialize
}

export function cookieVerify(cookie: any) {
  const accessToken = cookie.get(ACCESS_TOKEN) || ''
  const refreshToken = cookie.get(REFRESH_TOKEN)
  const secret = process.env.JWT_SECRET || ''
  const value: any = accessToken?.value || refreshToken?.value
  const user: any = verify(value, secret) || {}
  return { value, user, accessToken, refreshToken, secret }
}

export function clearAccessToken() {
  const options: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0,
  }
  
  // فقط اگر domain تعریف شده باشد اضافه کن
  if (process.env.COOKIE_DOMAIN) {
    options.domain = process.env.COOKIE_DOMAIN
  }
  
  return serialize(ACCESS_TOKEN, '', options)
}

export function clearRefreshToken() {
  const options: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0,
  }
  
  // فقط اگر domain تعریف شده باشد اضافه کن
  if (process.env.COOKIE_DOMAIN) {
    options.domain = process.env.COOKIE_DOMAIN
  }
  
  return serialize(REFRESH_TOKEN, '', options)
}