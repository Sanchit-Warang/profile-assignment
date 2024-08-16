'use client'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts, getProduct, getProductExistsInCart } from '@/server/Query'
import { useAuthStore } from '@/zustand/AuthStore'
export const useGetProducts = () => {
  return useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const { error, success } = await getAllProducts()
      if (error) throw error
      return success
    },
  })
}

export const useGetProductQuery = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { error, success } = await getProduct(id)
      if (error) throw error
      return success
    },
  })
}

export const useGetProductExistsInCartQuery = (id: number) => {
  const user = useAuthStore((state) => state.user)
  return useQuery({
    queryKey: ['product', 'exists', user ? user.id : null, id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      const { error, success } = await getProductExistsInCart(user.id, id)
      if (error) throw error
      return success
    },
  })
}
