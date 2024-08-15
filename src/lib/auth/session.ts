import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode(process.env.JWT_SECRET || 'dashasdlk')

const options: {
  httpOnly: boolean
  secure: boolean
  sameSite: boolean | 'lax' | 'strict' | 'none' | undefined
  path: string
} = { httpOnly: true, secure: true, sameSite: 'lax', path: '/' }

const cookie = {
  name: 'session',
  options: options,
  duration: 1000 * 60 * 60 * 24 * 30,
}

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

type Token = {
  id: number
  name: string
  email: string
}

export async function createSession<T>(payload: T) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ ...payload, expires })
  cookies().set(cookie.name, session, { ...cookie.options, expires })
}

export async function verifySession() {
  const token = cookies().get(cookie.name)?.value
  return token ? ((await decrypt(token)) as Token) : null
}

export async function deleteSession() {
  cookies().delete(cookie.name)
}
