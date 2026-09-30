'use server'

import { randomUUID } from 'node:crypto'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import { MAX_QUANTITY_PER_ITEM, type CartItem } from '@/lib/cart'

function validateCart(items: unknown) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty')
  }

  const quantities = new Map<string, number>()
  for (const item of items as CartItem[]) {
    const product = PRODUCTS.find((p) => p.id === item?.productId)
    if (!product) {
      throw new Error('Invalid product in cart')
    }
    const { quantity } = item
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Invalid quantity')
    }
    quantities.set(product.id, (quantities.get(product.id) ?? 0) + quantity)
  }

  for (const total of quantities.values()) {
    if (total > MAX_QUANTITY_PER_ITEM) {
      throw new Error(`Maximum ${MAX_QUANTITY_PER_ITEM} units per product`)
    }
  }

  return [...quantities.entries()].map(([productId, quantity]) => ({
    product: PRODUCTS.find((p) => p.id === productId)!,
    quantity,
  }))
}

export async function startCheckoutSession(items: CartItem[]) {
  const lines = validateCart(items)

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      line_items: lines.map(({ product, quantity }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.tagline,
          },
          unit_amount: product.priceInCents,
        },
        quantity,
      })),
      mode: 'payment',
    },
    { idempotencyKey: randomUUID() },
  )

  if (!session.client_secret) {
    throw new Error('Unable to create checkout session')
  }

  return session.client_secret
}
