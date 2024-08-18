'use client'
import { useGetCartQuery } from '@/hooks/cart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import { cn } from '@/lib/utils'
import Loader from '../ui/Loader'
import { motion } from 'framer-motion'

export type CartListProps = {} & React.HTMLAttributes<HTMLDivElement>

const CartList = ({ className, ...props }: CartListProps) => {
  const getCart = useGetCartQuery()

  if (getCart.error)
    return (
      <div className={cn('', className)} {...props}>
        {JSON.stringify(getCart.error)}
      </div>
    )
  if (getCart.isLoading)
    return (
      <div className={cn('w-full', className)} {...props}>
        <Loader />
      </div>
    )
  if (!getCart.data)
    return (
      <div className={cn('', className)} {...props}>
        No Items
      </div>
    )

  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}
      {...props}
    >
      <div className="col-span-2 space-y-4">
        {getCart.data.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, translateY: 15 }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            transition={{ duration: 0.3, delay: i * 0.3 }}
          >
            <CartItem product={product} />
          </motion.div>
        ))}
      </div>
      <CartSummary cart={getCart.data} />
    </div>
  )
}

export default CartList
