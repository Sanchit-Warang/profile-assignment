'use client'
import { CardProps } from '../ui/Card'
import Card from '../ui/Card'
import { cn } from '@/lib/utils'
import { useGetProductQuery } from '@/hooks/products'
import { useDeleteItemMutation } from '@/hooks/cart'
import { useAuthStore } from '@/zustand/AuthStore'

export type CartItemProps = {
  productId: number
} & Omit<CardProps, 'children'>

const CartItem = ({ className, productId, ...props }: CartItemProps) => {
  const user = useAuthStore((state) => state.user)
  const getProduct = useGetProductQuery(productId)
  const deleteItemMutation = useDeleteItemMutation()

  const ItemJSX = () => {
    if (getProduct.isError) return <div>{JSON.stringify(getProduct.error)}</div>
    if (getProduct.isLoading) return <div>Loading...</div>
    if (!getProduct.data) return <div>No Item</div>
    return <div>{getProduct.data.name}</div>
  }

  return (
    <Card className={cn('w-full', className)} {...props}>
      {ItemJSX()}
      {user && (
        <button
          onClick={() =>
            deleteItemMutation.mutate({ userId: user.id, productId })
          }
        >
          Remove
        </button>
      )}
    </Card>
  )
}

export default CartItem
