'use server'
import { db } from '@/utils/db'
import errHand from '@/utils/errhand'
import { registerBody, loginBody } from '@/schema/body'
import { z } from 'zod'
import { hash, compare } from 'bcrypt'
import { createSession, deleteSession, verifySession } from '@/lib/auth/session'

export const register = errHand(async (user: z.infer<typeof registerBody>) => {
  const existingUser = await db.user.findUnique({
    where: { email: user.email },
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hash(user.password, 10)

  const newUser = await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  })

  await db.cart.create({
    data: {
      userId: newUser.id,
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
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  })

  return existingUser
})

export const logout = errHand(async () => {
  await deleteSession()
  return null
})

export const addItemToCart = errHand(
  async (userId: number, productId: number) => {
    const user = await verifySession()

    if (!user) {
      throw new Error('User not authenticated')
    }

    if (userId !== user.id) {
      throw new Error('User does not match')
    }
    
    console.log('Sanchit',userId)

    const cart = await db.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    })

    const existingCartProduct = await db.cartProduct.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    })

    if (existingCartProduct) {
      throw new Error('Product already in cart')
    }

    await db.cartProduct.create({
      data: {
        cartId: cart.id,
        productId,
      },
    })

    return 'Product added to cart'
  }
)

export const updateProductQuantity = errHand(
  async (userId: number, productId: number, quantity: number) => {
    const user = await verifySession()

    if (!user) {
      throw new Error('User not authenticated')
    }

    if (userId !== user.id) {
      throw new Error('User does not match')
    }

    const cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!cart) {
      throw new Error('Cart not found')
    }

    // Check if the product exists in the cart
    const existingCartProduct = await db.cartProduct.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (!existingCartProduct) {
      throw new Error('Product not found in cart');
    }

    if (quantity <= 0) {
      // If quantity is 0, delete the product from the cart
      await db.cartProduct.delete({
        where: {
          id: existingCartProduct.id,
        },
      });
      return 'Product removed from cart';
    } else {
      // Update the quantity of the product in the cart
      await db.cartProduct.update({
        where: {
          id: existingCartProduct.id,
        },
        data: {
          quantity: quantity,
        },
      });
      return 'Quantity updated successfully';
    }

  }
)
