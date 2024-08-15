import { z } from 'zod'

export const registerBody = z.object({
  name: z.string({ required_error: 'Name is must' }),
  email: z.string({ required_error: 'Email is must' }).email(),
  password: z.string({ required_error: 'Password is must' }),
})

export const loginBody = z.object({
  email: z.string({ required_error: 'Email is must' }).email(),
  password: z.string({ required_error: 'Password is must' }),
})

