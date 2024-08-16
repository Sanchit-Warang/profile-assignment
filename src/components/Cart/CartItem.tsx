'use client'
import { CardProps } from '../ui/Card'
import Card from '../ui/Card'
import { cn } from '@/lib/utils'
import { useDeleteItemMutation } from '@/hooks/cart'
import { useAuthStore } from '@/zustand/AuthStore'
import { Product } from '@prisma/client'
import { Trash } from 'lucide-react'
import Button from '../ui/Button'
import Image from 'next/image'

export type CartItemProps = {
  product: Product & { quantity: number }
} & Omit<CardProps, 'children'>

const CartItem = ({ className, product, ...props }: CartItemProps) => {
  const user = useAuthStore((state) => state.user)
  const deleteItemMutation = useDeleteItemMutation()
  return (
    <Card
      className={cn('w-full flex items-center gap-4', className)}
      {...props}
    >
      <div className="w-[50%] md:w-[20%] overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover w-full ease-in-out duration-300 transition-all hover:scale-110"
        />
      </div>
      {product.name}
      {user && (
        <Button
          className="ml-auto py-2 px-2 min-w-0 rounded-full flex items-center justify-center text-sm" 
          variant="danger"
          onClick={async () =>
            await deleteItemMutation.mutateAsync({
              userId: user.id,
              productId: product.id,
            })
          }
        >
          <Trash />
        </Button>
      )}
    </Card>
  )
}

export default CartItem
