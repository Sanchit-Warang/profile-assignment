'use client'
import { useGetCartQuery } from '@/hooks/cart'
import Card from '../ui/Card'
import CartItem from './CartItem'
import { useEffect } from 'react'

const CartList = () => {
  const getCart = useGetCartQuery()

  useEffect(() => {
    console.log(getCart.data)
  }, [getCart.data])

  if (getCart.error) return <div>{JSON.stringify(getCart.error)}</div>
  if (getCart.isLoading) return <div>Loading...</div>
  if (!getCart.data) return <div>No Items</div>

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        {getCart.data.map((productId) => (
          <CartItem key={productId} productId={productId} />
        ))}
      </div>
      <div className="col-span-1">
        <Card className="w-full">Summary</Card>
      </div>
    </div>
  )
}

export default CartList
