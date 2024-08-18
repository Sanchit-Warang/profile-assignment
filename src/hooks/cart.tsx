'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/zustand/AuthStore'
import {
  addItemToCart,
  updateProductQuantity,
  addDiscountCode,
  emptyCart,
} from '@/server/Mutations'
import { getCart, getDiscount } from '@/server/Query'
import { PopulatedCart } from '@/types'
import { Product } from '@prisma/client'

export const useGetCartQuery = () => {
  const user = useAuthStore((state) => state.user)
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      const { error, success } = await getCart(user.id)
      if (error) throw new Error(error)
      if (success) return success
    },
  })
}

export const useGetDiscountQuery = () => {
  const user = useAuthStore((state) => state.user)
  return useQuery({
    queryKey: ['cart', 'discount'],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      const { error, success } = await getDiscount(user.id)
      if (error) throw new Error(error)
      if (success !== undefined) {
        return success
      }
    },
  })
}

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      product,
    }: {
      userId: number
      product: Product
    }) => {
      const { error, success } = await addItemToCart(userId, product.id)
      if (error) throw new Error(error)
      if (success) return success
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['cart'],
      })

      const previousCart = (await queryClient.getQueryData([
        'cart',
      ])) as PopulatedCart[]

      await queryClient.setQueryData(['cart'], (oldCart: PopulatedCart[]) => {
        if (oldCart) {
          return [...oldCart, { ...variables.product, quantity: 1 }]
        }
        return [{ ...variables.product, quantity: 1 }]
      })
      return { previousCart }
    },
    onError: async (error, variables, context) => {
      if (context?.previousCart) {
        await queryClient.setQueryData(['cart'], context.previousCart)
      }
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
      toast.success('Added to cart')
    },
  })
}

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      productId,
      quantity,
    }: {
      userId: number
      productId: number
      quantity: number
    }) => {
      const { error, success } = await updateProductQuantity(
        userId,
        productId,
        quantity
      )
      if (error) throw new Error(error)
      if (success) return success
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['cart'],
      })

      const previousCart = (await queryClient.getQueryData([
        'cart',
      ])) as PopulatedCart[]

      await queryClient.setQueryData(['cart'], (oldCart: PopulatedCart[]) => {
        if (variables.quantity === 0) {
          return oldCart.filter(({ id }) => id !== variables.productId)
        }
        return oldCart.map((product) => {
          if (product.id === variables.productId) {
            return { ...product, quantity: variables.quantity }
          }
          return product
        })
      })
      return { previousCart }
    },
    onError: async (error, variables, context) => {
      if (context?.previousCart) {
        await queryClient.setQueryData(['cart'], context.previousCart)
      }
      toast.error(error.message)
    },
    onSettled: async (variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
      if (variables) {
        toast.success(variables)
      }
    },
  })
}

export const useApplyCouponMutation = () => {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (coupon: number) => {
      if (!user) throw new Error('User not authenticated')
      if (coupon == 10) {
        const { error, success } = await addDiscountCode(user.id, 'DISCOUNT10')
        if (error) throw new Error(error)
        if (success) return success
      }
      if (coupon == 20) {
        const { error, success } = await addDiscountCode(user.id, 'DISCOUNT20')
        if (error) throw new Error(error)
        if (success) return success
      }
      throw new Error('Invalid amount')
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['cart', 'discount'],
      })

      const previousDiscount = (await queryClient.getQueryData([
        'cart',
        'discount',
      ])) as number

      await queryClient.setQueryData(['cart', 'discount'], () => {
        return variables
      })

      return { previousDiscount }
    },
    onError: async (error, variables, context) => {
      if (context?.previousDiscount) {
        await queryClient.setQueryData(
          ['cart', 'discount'],
          context.previousDiscount
        )
      }
      toast.error(error.message)
    },
    onSettled: async (asd) => {
      await queryClient.invalidateQueries({
        queryKey: ['cart', 'discount'],
      })
      if (asd) {
        toast.success(asd)
      }
    },
  })
}

export const useEmptyCartMutation = () => {
  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated')
      const { error, success } = await emptyCart(user.id)
      if (error) throw new Error(error)
      if (success) return success
    },
    onError: async (error) => {
      toast.error(error.message)
    },
    onSettled: async (variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
      if (variables) toast.success('Order placed')
    },
  })
}
