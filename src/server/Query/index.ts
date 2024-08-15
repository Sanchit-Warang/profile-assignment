'use server'
import { db } from '@/utils/db'
import errHand from '@/utils/errhand'
import { verifySession } from '@/lib/auth/session'

export const getAllProducts = errHand(async () => {
  const products = await db.product.findMany()
  return products
})

export const getSession = errHand(async () => {
  return await verifySession()
})

