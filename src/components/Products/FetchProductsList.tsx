import { getAllProducts } from '@/server/Query/index'
import { Suspense } from 'react'
import ProductList from './ProductList'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query'
import Loader from '../ui/Loader'

const ProductsListData = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { error, success } = await getAllProducts()
      if (error) throw error
      return success
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  )
}

const FetchProductsList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductsListData />
    </Suspense>
  )
}

export default FetchProductsList
