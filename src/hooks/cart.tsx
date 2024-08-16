'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/zustand/AuthStore'
import { addItemToCart, updateProductQuantity } from '@/server/Mutations'
import { getCart } from '@/server/Query'

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
      productId,
    }: {
      userId: number
      productId: number
    }) => {
      const { error, success } = await addItemToCart(userId, productId)
      console.log('Sanchit', error)
      if (error) throw new Error(error)
      if (success) return success
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['cart', variables.userId],
      })

      await queryClient.cancelQueries({
        queryKey: ['product', 'exists', variables.userId, variables.productId],
      })

      const previousCart = queryClient.getQueryData([
        'cart',
        variables.userId,
      ]) as number[]

      const previousProductExists = queryClient.getQueryData([
        'product',
        'exists',
        variables.userId,
        variables.productId,
      ])

      queryClient.setQueryData(
        ['cart', variables.userId],
        (oldCart: number[]) => {
          if (oldCart) {
            return [...oldCart, variables.productId]
          }
          return [variables.productId]
        }
      )

      queryClient.setQueryData(
        ['product', 'exists', variables.userId, variables.productId],
        () => {
          return true
        }
      )

      return { previousCart, previousProductExists }
    },
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ['cart', variables.userId],
          context.previousCart
        )
      }

      if (context?.previousProductExists) {
        queryClient.setQueryData(
          ['product', 'exists', variables.userId, variables.productId],
          context.previousProductExists
        )
      }

      toast.error(error.message)
    },
    onSettled: (_temp, _temp2, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', variables.userId],
      })
      queryClient.invalidateQueries({
        queryKey: ['product', 'exists', variables.userId, variables.productId],
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
      const { error, success } = await updateProductQuantity(userId, productId, 0)
      if (error) throw new Error(error)
      if (success) return success
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ['cart', variables.userId],
      })

      await queryClient.cancelQueries({
        queryKey: ['product', 'exists', variables.userId, variables.productId],
      })

      const previousCart = queryClient.getQueryData([
        'cart',
        variables.userId,
      ]) as number[]

      const previousProductExists = queryClient.getQueryData([
        'product',
        'exists',
        variables.userId,
        variables.productId,
      ])

      queryClient.setQueryData(
        ['cart', variables.userId],
        (oldCart: number[]) => {
          return oldCart.filter((id) => id !== variables.productId)
        }
      )

      queryClient.setQueryData(
        ['product', 'exists', variables.userId, variables.productId],
        () => {
          return false
        }
      )

      return { previousCart, previousProductExists }
    },
    onError: (error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ['cart', variables.userId],
          context.previousCart
        )
      }

      if (context?.previousProductExists) {
        queryClient.setQueryData(
          ['product', 'exists', variables.userId, variables.productId],
          context.previousProductExists
        )
      }

      toast.error(error.message)
    },
    onSettled: (_temp, _temp2, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', variables.userId],
      })
      queryClient.invalidateQueries({
        queryKey: ['product', 'exists', variables.userId, variables.productId],
      })
    },
    onSuccess: () => {
      toast.success('Removed to cart')
    },
  })
}
