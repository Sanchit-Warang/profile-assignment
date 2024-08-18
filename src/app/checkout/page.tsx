'use client'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import Link from 'next/link'

const CheckoutPage = () => {
  useEffect(() => {
    confetti()
  }, [])
  return (
    <>
      <main className="space-y-4">
        <h1 className=" text-3xl font-semibold">Checkout Page</h1>
        <div className="flex flex-col gap-10 items-center justify-center w-full h-[40vh]">
          <p className="text-2xl ">Order Successful</p>
          <Link href={'/'}>
            <p>Go back to Products</p>
          </Link>
        </div>
      </main>
    </>
  )
}

export default CheckoutPage
