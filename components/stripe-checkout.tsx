'use client'

import { useCallback } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export function StripeCheckout({ productId }: { productId: string }) {
  const fetchClientSecret = useCallback(() => startCheckoutSession(productId), [productId])

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
