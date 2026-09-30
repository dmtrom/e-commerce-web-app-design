import { PRODUCTS, type Product } from '@/lib/products'

export const MAX_QUANTITY_PER_ITEM = 10

export interface CartItem {
  productId: string
  quantity: number
}

export interface CartLine {
  product: Product
  quantity: number
}

export function resolveCart(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId)
    return product ? [{ product, quantity: item.quantity }] : []
  })
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.product.priceInCents * line.quantity, 0)
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}
