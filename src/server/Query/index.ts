'use server'
import { db } from '@/utils/db'
import errHand from '@/utils/errhand'
import { verifySession } from '@/lib/auth/session'

export const getAllProducts = errHand(async () => {
  const products = await db.product.findMany()
  return products
})

export const getProduct = errHand(async (id: number) => {
  const product = await db.product.findUnique({ where: { id } })
  return product
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
      products: true,
    },
  })

  if (!cart) {
    throw new Error('Cart not found')
  }

  const res = cart.products.map((product) => {
    return product.productId
  })

  return res
})

export const getProductExistsInCart = errHand(
  async (userId: number, productId: number) => {
    const { error, success } = await getCart(userId)
    if (error) throw new Error(error)
    if (success) return success.includes(productId)
    return false
  }
)


