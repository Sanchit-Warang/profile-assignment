'use client'
import { useGetProducts } from '@/hooks/products'
import ProductCard from './ProductCard'
import { useAuthStore } from '@/zustand/AuthStore'
import CartList from '../Cart/CartList'

const ProductList = () => {
  const products = useGetProducts()
  const user = useAuthStore((state) => state.user)

  if (products.error) return <div>{JSON.stringify(products.error)}</div>
  if (products.isLoading) return <div>Loading...</div>
  if (!products.data) return <div>No Products</div>

  return (
    <>
      {user ? <div className="text-xl">Welcome {user.name}</div> : null}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {products.data.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
      <CartList className='hidden' />
    </>
  )
}

export default ProductList
