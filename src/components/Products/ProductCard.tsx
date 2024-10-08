'use client'
import Card from '../ui/Card'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Button from '../ui/Button'
import { useAuthStore } from '@/zustand/AuthStore'
import { useRouter } from 'next/navigation'
import { useAddToCartMutation, useGetCartQuery } from '@/hooks/cart'
import Chip from '../ui/chip'

export type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()
  const addToCartMutation = useAddToCartMutation()
  const getCart = useGetCartQuery()

  const handleClick = async () => {
    if (!user) {
      router.replace('/login')
      return
    }
    await addToCartMutation.mutateAsync({ userId: user.id, product: product })
  }

  const existInCart = getCart.data
    ? getCart.data.some((p) => p.id === product.id)
    : false

  return (
    <Card className="rounded-3xl transition-all duration-500 space-y-3 hover:bg-primary/20">
      <div className="overflow-hidden w-full rounded-2xl relative shadow-md">
        {product.id < 4 && (
          <Chip
            className="w-14 absolute -top-1 -left-1 rounded-2xl rounded-l-none rounded-t-none border-none z-10"
            variant="secondary"
          >
            New
          </Chip>
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover w-full ease-in-out duration-300 transition-all hover:scale-110"
        />
      </div>
      <p className="text-lg font-medium truncate">{product.name}</p>
      <div>
        <p className="text-lg font-medium">
          Price: ${product.price} {}
        </p>
      </div>
      <div className="w-full">
        <center>
          {user && existInCart ? (
            <Button variant="secondary" onClick={() => router.replace('/cart')}>
              Go to Cart
            </Button>
          ) : (
            <Button
              isDisabled={existInCart}
              onClick={async () => await handleClick()}
              className="rounded-xl"
            >
              Add to cart
            </Button>
          )}
        </center>
      </div>
    </Card>
  )
}

export default ProductCard
