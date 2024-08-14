import Card from '../ui/Card'
import { Product } from '@prisma/client'
import Image from 'next/image'

export type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className='rounded-3xl space-y-3'>
      <Image src={product.image} alt={product.name} width={200} height={200} className='w-full rounded-2xl' />
      <p className='text-lg font-medium truncate'>{product.name}</p>
      <div>
        <p className='text-lg font-medium'>Price: ${product.price}</p>
      </div>
      <div className='w-full'>
        <center>
            <button className='bg-primary px-4 py-2 rounded-3xl text-primary-content'>
              Add to cart
            </button>
        </center>
      </div>
    </Card>
  )
}

export default ProductCard
