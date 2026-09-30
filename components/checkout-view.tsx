import Image from 'next/image'
import { ArrowLeft, Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { StripeCheckout } from '@/components/stripe-checkout'
import { formatPrice, type Product } from '@/lib/products'

export function CheckoutView({ product, onBack }: { product: Product; onBack: () => void }) {
  const lines = [
    { label: 'Subtotal', value: formatPrice(product.priceInCents) },
    { label: 'Shipping', value: 'Free' },
    { label: 'Taxes', value: 'Calculated at payment' },
  ]

  return (
    <div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-5 md:gap-6 md:p-8">
      <aside className="hidden flex-col justify-between gap-6 rounded-2xl border bg-card p-6 md:col-span-2 md:flex md:p-8">
        <div className="flex flex-col gap-6">
          <Button variant="ghost" size="sm" className="w-fit" onClick={onBack}>
            <ArrowLeft data-icon="inline-start" />
            Back to product
          </Button>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Order summary</p>
            <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
          </div>
          <div className="flex items-center gap-4 rounded-xl border p-3">
            <Image
              src={product.image}
              alt={product.name}
              width={72}
              height={72}
              className="size-18 rounded-lg bg-black object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-medium">{product.name}</span>
              <span className="truncate text-xs text-muted-foreground">{product.tagline}</span>
              <span className="text-xs text-muted-foreground">Qty 1</span>
            </div>
            <span className="font-mono font-medium">{formatPrice(product.priceInCents)}</span>
          </div>
          <dl className="flex flex-col gap-3 text-sm">
            {lines.map((line) => (
              <div key={line.label} className="flex justify-between">
                <dt className="text-muted-foreground">{line.label}</dt>
                <dd className="font-mono">{line.value}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd className="font-mono">{formatPrice(product.priceInCents)}</dd>
            </div>
          </dl>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="size-3.5 text-primary" aria-hidden="true" />
          Payments are encrypted and processed securely by Stripe.
        </p>
      </aside>

      <section
        aria-label="Payment details"
        className="min-h-0 overflow-y-auto rounded-2xl border bg-white md:col-span-3"
      >
        <StripeCheckout key={product.id} productId={product.id} />
      </section>
    </div>
  )
}
