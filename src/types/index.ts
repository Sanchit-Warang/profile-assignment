import { Product } from '@prisma/client'

export type PopulatedCart = Product & { quantity: number }
