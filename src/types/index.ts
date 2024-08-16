import { CartProduct, Cart, Product } from '@prisma/client'

export type PopulatedCart = Cart & {
  products: (CartProduct & { product: Product })[]
}
