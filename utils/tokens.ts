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

// نکته: عمداً Domain روی کوکی ست نمی‌شود.
// فرانت و API هر دو روی یک origin هستند (/api)، پس کوکی «host-only» کافی است.
// مقدار COOKIE_DOMAIN قبلی (https://...) اصلاً دامنه‌ی معتبر نبود و باعث رد شدن کوکی می‌شد.
const getCookieOptions = (maxAge?: number) => {
  const options: any = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    priority: 'medium',
  }

  if (maxAge !== undefined) {
    options.maxAge = maxAge
  }

  return options
}

// توجه: این توابع «رشته‌ی کامل Set-Cookie» برمی‌گردانند، نه خود توکن.
export function setAccessToken({ user, maxAge = ACCESS_MAX_AGE }: SetToken) {
  const secret = process.env.JWT_SECRET || ''

  const token = sign({ user }, secret, { expiresIn: '2d' })

  return serialize(ACCESS_TOKEN, token, getCookieOptions(maxAge))
}

export function setRefreshToken({ user, maxAge = REFRESH_MAX_AGE }: SetToken) {
  const secret = process.env.JWT_SECRET || ''

  const token = sign({ user }, secret, { expiresIn: '1y' })

  return serialize(REFRESH_TOKEN, token, getCookieOptions(maxAge))
}

// فقط کوکی‌ها را می‌خواند؛ هیچ verify ای انجام نمی‌دهد و خطا پرتاب نمی‌کند.
export function getAuthCookies(cookie: any) {
  const accessToken = cookie.get(ACCESS_TOKEN)
  const refreshToken = cookie.get(REFRESH_TOKEN)
  const secret = process.env.JWT_SECRET || ''
  return { accessToken, refreshToken, secret }
}

// رفتار قبلی حفظ شده (برای بقیه‌ی روت‌ها): اگر توکن نباشد یا نامعتبر باشد خطا پرتاب می‌شود.
// خروجی: user = { user: { _id, userName }, iat, exp }
export function cookieVerify(cookie: any) {
  const { accessToken, refreshToken, secret } = getAuthCookies(cookie)
  const value: any = accessToken?.value || refreshToken?.value
  const user: any = verify(value, secret) || {}
  return { value, user, accessToken, refreshToken, secret }
}

const getClearOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  expires: new Date(0),
  maxAge: 0,
})

export function clearAccessToken() {
  return serialize(ACCESS_TOKEN, '', getClearOptions())
}

export function clearRefreshToken() {
  return serialize(REFRESH_TOKEN, '', getClearOptions())
}
