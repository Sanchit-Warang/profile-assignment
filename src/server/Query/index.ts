'use server'
import { db } from '@/utils/db'

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
