'use server'

import { randomUUID } from 'node:crypto'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.tagline,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    },
    { idempotencyKey: randomUUID() },
  )

  if (!session.client_secret) {
    throw new Error('Unable to create checkout session')
  }

  return session.client_secret
}
