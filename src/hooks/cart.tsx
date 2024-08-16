'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/zustand/AuthStore'
import { addItemToCart, updateProductQuantity } from '@/server/Mutations'
import { getCart } from '@/server/Query'
import { PopulatedCart } from '@/types'
import { Product } from '@prisma/client'

export const useGetCartQuery = () => {
  const user = useAuthStore((state) => state.user)
  return useQuery({
    queryKey: ['cart', user ? user.id : null],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      const { error, success } = await getCart(user.id)
      if (error) throw new Error(error)
      if (success) return success
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
        queryKey: ['cart', variables.userId],
      })

      const previousCart = await queryClient.getQueryData([
        'cart',
        variables.userId,
      ]) as PopulatedCart[]

      await queryClient.setQueryData(
        ['cart', variables.userId],
        (oldCart: PopulatedCart[]) => {
          if (oldCart) {
            return [...oldCart, { ...variables.product, quantity: 1 }]
          }
          return [{ ...variables.product, quantity: 1 }]
        }
      )
      return { previousCart }
    },
    onError: async (error, variables, context) => {
      if (context?.previousCart) {
        await queryClient.setQueryData(
          ['cart', variables.userId],
          context.previousCart
        )
      }
      toast.error(error.message)
    },
    onSettled: async (_temp, _temp2, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['cart', variables.userId],
      })
    },
    onSuccess: () => {
      toast.success('Added to cart')
    },
  })
}

export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      productId,
    }: {
      userId: number
      productId: number
    }) => {
      const { error, success } = await updateProductQuantity(
        userId,
        productId,
        0
      )
      if (error) throw new Error(error)
      if (success) return success
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['cart', variables.userId],
      })

      const previousCart = await queryClient.getQueryData([
        'cart',
        variables.userId,
      ]) as PopulatedCart[]

      await queryClient.setQueryData(
        ['cart', variables.userId],
        (oldCart: PopulatedCart[]) => {
          return oldCart.filter(({ id }) => id !== variables.productId)
        }
      )
      return { previousCart }
    },
    onError: async (error, variables, context) => {
      if (context?.previousCart) {
        await queryClient.setQueryData(
          ['cart', variables.userId],
          context.previousCart
        )
      }
      toast.error(error.message)
    },
    onSettled: async (_temp, _temp2, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['cart', variables.userId],
      })
    },
    onSuccess: () => {
      toast.success('Removed from cart')
    },
  })
}
