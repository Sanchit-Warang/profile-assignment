'use client'
import SideBarButton from '../ui/SideBarButton'
import { ShoppingCart } from 'lucide-react'
import { useGetCartQuery } from '@/hooks/cart'
import Link from 'next/link'
const CartSideButton = () => {
  const getCart = useGetCartQuery()

  const quantity = getCart.data?.length || 0

  return (
    <div className="relative">
      <div className="bg-secondary text-secondary-content absolute -top-2 -right-1 p-1 rounded-full text-sm h-6 w-6 flex justify-center items-center">
        {quantity}
      </div>
      <Link href={'/cart'}>
        <SideBarButton url={'/cart'} icon={<ShoppingCart />} />
      </Link>
    </div>
  )
}

export default CartSideButton
