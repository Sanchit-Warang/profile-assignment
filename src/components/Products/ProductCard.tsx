import Card from '../ui/Card'
import { Product } from '@prisma/client'
import Image from 'next/image'

export type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="rounded-3xl transition-all duration-500 space-y-3 hover:bg-primary/20">
      <div className='overflow-hidden w-full rounded-2xl relative shadow-md'>
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
        <p className="text-lg font-medium">Price: ${product.price}</p>
      </div>
      <div className="w-full">
        <center>
          <button className="hover:bg-primary-light bg-primary px-4 py-2 rounded-3xl text-primary-content">
            Add to cart
          </button>
        </center>
      </div>
    </Card>
  )
}

export default ProductCard
