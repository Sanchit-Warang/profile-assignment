import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/server/Query'
export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { error, success } = await getAllProducts()
      if (error) throw error
      return success
    },
  })
}
