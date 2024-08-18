'use client'
import { useGetCartQuery } from '@/hooks/cart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import { cn } from '@/lib/utils'

export type CartListProps = {} & React.HTMLAttributes<HTMLDivElement>

const CartList = ({ className, ...props }: CartListProps) => {
  const getCart = useGetCartQuery()

  if (getCart.error) return <div className={cn('', className)} {...props} >{JSON.stringify(getCart.error)}</div>
  if (getCart.isLoading) return <div className={cn('', className)} {...props} >Loading...</div>
  if (!getCart.data) return <div className={cn('', className)} {...props} >No Items</div>

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)} {...props}>
      <div className="col-span-2 space-y-4">
        {getCart.data.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <CartSummary cart={getCart.data} />
    </div>
  )
}

export default CartList
