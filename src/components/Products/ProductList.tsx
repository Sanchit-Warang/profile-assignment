'use client'
import { useGetProducts } from '@/hooks/products'
import ProductCard from './ProductCard'

const ProductList = () => {
  const products = useGetProducts()
  if (products.error) return <div>{JSON.stringify(products.error)}</div>
  if (products.isLoading) return <div>Loading...</div>
  if (!products.data) return <div>No Products</div>
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4'>
      {products.data.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}

export default ProductList
