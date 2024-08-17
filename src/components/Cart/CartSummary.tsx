'use client'
import Card from '../ui/Card'
import { PopulatedCart } from '@/types'
import { useGetDiscountQuery, useApplyCouponMutation } from '@/hooks/cart'
import Button from '../ui/Button'

export type CartSummaryProps = {
  cart: PopulatedCart[]
}

const CartSummary = ({ cart }: CartSummaryProps) => {
  const getDiscount = useGetDiscountQuery()
  const addApplyCoupon = useApplyCouponMutation()
  const total = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  const d = getDiscount.data || 0
  const totalWithDiscount = total - total * (d / 100)
  return (
    <div className="col-span-1">
      <Card className="w-full space-y-3">
        <p className="text-2xl font-semibold">Summary</p>
        <div className="space-y-2">
          {cart.map((product) => (
            <div className="flex justify-between" key={product.id}>
              <p>{product.name}</p>
              <p>
                ${product.quantity * product.price} ({product.quantity})
              </p>
            </div>
          ))}
        </div>
        {getDiscount.data !== undefined && (
          <>
            <div className="w-full flex justify-between text-lg font-semibold">
              <p>Discount</p>
              <p>{getDiscount.data}%</p>
            </div>

            <div className="flex gap-1 ">
              <Button
                onClick={async () => await addApplyCoupon.mutateAsync(10)}
                variant="secondary"
                isDisabled={getDiscount.data === 10}
              >
                10% Discount
              </Button>
              <Button
                onClick={async () => await addApplyCoupon.mutateAsync(20)}
                variant="secondary"
                isDisabled={getDiscount.data === 20}
              >
                20% Discount
              </Button>
            </div>

            <div>
              <p className="text-lg font-semibold">
                Total: ${totalWithDiscount.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default CartSummary
