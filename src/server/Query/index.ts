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

export const getCart = errHand(async (userId: number) => {
  const user = await verifySession()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart) {
    throw new Error('Cart not found')
  }

  const res = cart.products.map((product) => {
    return { ...product.product, quantity: product.quantity }
  })

  return res
})
