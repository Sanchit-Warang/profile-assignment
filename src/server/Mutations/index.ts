'use server'
import { db } from '@/utils/db'
import errHand from '@/utils/errhand'
import { registerBody, loginBody } from '@/schema/body'
import { z } from 'zod'
import { hash, compare } from 'bcrypt'
import { createSession, deleteSession } from '@/lib/auth/session'

export const register = errHand(async (user: z.infer<typeof registerBody>) => {
  const existingUser = await db.user.findUnique({
    where: { email: user.email },
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(user.password, 10)

  await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  })

  const { error, success } = await login({
    email: user.email,
    password: user.password,
  })

  if (error) {
    throw new Error(error)
  }

  return success
})

export const login = errHand(async (user: z.infer<typeof loginBody>) => {
  const existingUser = await db.user.findUnique({
    where: { email: user.email },
  })

  if (!existingUser) {
    throw new Error('User does not exist')
  }

  const passwordMatch = await compare(user.password, existingUser.password)

  if (!passwordMatch) {
    throw new Error('Incorrect password')
  }

  await createSession({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  })

  return existingUser
})

export const logout = errHand(async () => {
  await deleteSession()
  return null
})
