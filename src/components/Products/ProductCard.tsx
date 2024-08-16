'use client'
import Card from '../ui/Card'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Button from '../ui/Button'
import { useAuthStore } from '@/zustand/AuthStore'
import { useRouter } from 'next/navigation'
import { useAddToCartMutation } from '@/hooks/cart'
import { useGetProductExistsInCartQuery } from '@/hooks/products'

export type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const user = useAuthStore((state) => state.user)
  const getProductExistsInCartQuery = useGetProductExistsInCartQuery(product.id)
  const router = useRouter()
  const addToCartMutation = useAddToCartMutation()

  const handleClick = () => {
    if (!user) {
      router.replace('/login')
      return
    }
    addToCartMutation.mutate({ userId: user.id, productId: product.id })
  }

  return (
    <Card className="rounded-3xl transition-all duration-500 space-y-3 hover:bg-primary/20">
      <div className="overflow-hidden w-full rounded-2xl relative shadow-md">
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
          {getProductExistsInCartQuery.data &&
          !getProductExistsInCartQuery.isLoading ? (
            <Button variant="secondary" onClick={() => router.replace('/cart')}>
              Go to Cart
            </Button>
          ) : (
            <Button
              isDisabled={getProductExistsInCartQuery.isLoading}
              onClick={() => handleClick()}
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
