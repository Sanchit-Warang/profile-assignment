'use client'
import { CardProps } from '../ui/Card'
import Card from '../ui/Card'
import { cn } from '@/lib/utils'
import { useUpdateItemMutation } from '@/hooks/cart'
import { useAuthStore } from '@/zustand/AuthStore'
import { Product } from '@prisma/client'
import { Trash } from 'lucide-react'
import Button from '../ui/Button'
import Image from 'next/image'
import Input from '../ui/Input'
import { Plus, Minus } from 'lucide-react'

export type CartItemProps = {
  product: Product & { quantity: number }
} & Omit<CardProps, 'children'>

const CartItem = ({ className, product, ...props }: CartItemProps) => {
  const user = useAuthStore((state) => state.user)
  const updateItemMutation = useUpdateItemMutation()
  return (
    <Card className={cn('w-full', className)} {...props}>
      <div className="w-full flex items-center gap-4">
        <div className="w-[70%] md:w-[20%] overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="object-cover w-full ease-in-out duration-300 transition-all hover:scale-110"
          />
        </div>
        <div>
          <p className="text-lg font-medium">{product.name}</p>
          <p>${product.price}</p>
        </div>
        {user && (
          <Button
            className="ml-auto py-2 px-2 min-w-0 rounded-full flex items-center justify-center text-sm"
            variant="danger"
            onClick={async () =>
              await updateItemMutation.mutateAsync({
                userId: user.id,
                productId: product.id,
                quantity: 0,
              })
            }
          >
            <Trash />
          </Button>
        )}
      </div>
      {user && (
        <div className="mt-3 w-[50%] md:w-[20%] flex gap-2">
          <Button
            variant="success"
            className="min-w-0 px-3 flex items-center justify-center"
            onClick={async () => {
              const q = product.quantity + 1
              if (q >= 0) {
                await updateItemMutation.mutateAsync({
                  userId: user.id,
                  productId: product.id,
                  quantity: q,
                })
              }
            }}
          >
            <Plus />
          </Button>
          <Input
            type="number"
            value={product.quantity}
            onChange={async (e) => {
              const q = parseInt(e.target.value)
              if (q >= 0) {
                await updateItemMutation.mutateAsync({
                  userId: user.id,
                  productId: product.id,
                  quantity: q,
                })
              }
            }}
          />
          <Button
            variant="danger"
            className="min-w-0 px-3 flex  items-center justify-center"
            onClick={async () => {
              const q = product.quantity - 1
              if (q >= 0) {
                await updateItemMutation.mutateAsync({
                  userId: user.id,
                  productId: product.id,
                  quantity: q,
                })
              }
            }}
          >
            <Minus />
          </Button>
        </div>
      )}
    </Card>
  )
}

export default CartItem
