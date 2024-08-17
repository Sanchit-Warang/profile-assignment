'use client'
import { useGetCartQuery } from '@/hooks/cart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

const CartList = () => {
  const getCart = useGetCartQuery()

  if (getCart.error) return <div>{JSON.stringify(getCart.error)}</div>
  if (getCart.isLoading) return <div>Loading...</div>
  if (!getCart.data) return <div>No Items</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
