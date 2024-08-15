'use server'
import { db } from '@/utils/db'
import errHand from '@/utils/errhand'
import { verifySession } from '@/lib/auth/session'

export const getAllProducts = async () => {
  try {
    const products = await db.product.findMany()
    return { success: products }
  } catch (error) {
    return {
      error: error as Error,
    }
  }
}

export const getCurrentUser = errHand(async () => {
  const user = await verifySession()
  return user
})
