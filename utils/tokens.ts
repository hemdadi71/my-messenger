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

  const accessTokenSerialize = serialize(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge, // would expire after 1 days,
    path: '/',
    priority: 'medium',
    domain: process.env.COOKIE_DOMAIN
  })
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

  const refreshTokenSerialize = serialize(REFRESH_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge, // would expire after 1 year
    path: '/',
    priority: 'medium',
    domain: process.env.COOKIE_DOMAIN
  })
  return refreshTokenSerialize
}

export function cookieVerify(cookie: any) {
  const accessToken = cookie.get(ACCESS_TOKEN)||''
  const refreshToken = cookie.get(REFRESH_TOKEN)
  const secret = process.env.JWT_SECRET || ''
  const value: any = accessToken?.value||refreshToken?.value
  const user: any = verify(value, secret) || {}
  return { value, user, accessToken, refreshToken, secret }
}

export function clearAccessToken() {
  return serialize(ACCESS_TOKEN, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    domain: process.env.COOKIE_DOMAIN
  })
}

export function clearRefreshToken() {
  return serialize(REFRESH_TOKEN, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    domain: process.env.COOKIE_DOMAIN
  })
}