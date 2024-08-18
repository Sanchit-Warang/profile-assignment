'use client'
import { useGetProducts } from '@/hooks/products'
import ProductCard from './ProductCard'
import Loader from '../ui/Loader'
import { motion } from 'framer-motion'

const ProductList = () => {
  const products = useGetProducts()

  if (products.error) return <div>{JSON.stringify(products.error)}</div>
  if (products.isLoading) return <Loader />
  if (!products.data) return <div>No Products</div>

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {products.data.map((product, i) => {
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, translateY: 15 }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{ duration: 0.3, delay: i * 0.3 }}
            >
              <ProductCard product={product} />{' '}
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default ProductList
