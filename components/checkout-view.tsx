'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Lock, Minus, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { StripeCheckout } from '@/components/stripe-checkout'
import { PRODUCTS, formatPrice } from '@/lib/products'
import { MAX_QUANTITY_PER_ITEM, cartTotal, resolveCart, type CartItem } from '@/lib/cart'

function useDebounced<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export function CheckoutView({
  cart,
  onSetQuantity,
  onBack,
}: {
  cart: CartItem[]
  onSetQuantity: (productId: string, quantity: number) => void
  onBack: () => void
}) {
  const lines = resolveCart(cart)
  const total = cartTotal(lines)
  const suggestions = PRODUCTS.filter((p) => !cart.some((item) => item.productId === p.id))

  const paymentCart = useDebounced(cart, 600)
  const paymentKey = paymentCart.map((i) => `${i.productId}:${i.quantity}`).join('|')

  return (
    <div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-5 md:gap-6 md:p-8">
      <aside className="flex min-h-0 flex-col gap-5 rounded-2xl border bg-card p-6 md:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Order summary</p>
            <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft data-icon="inline-start" />
            Keep shopping
          </Button>
        </div>

        <ul className="flex min-h-0 flex-col gap-2 overflow-y-auto">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-3 rounded-xl border p-2.5">
              <Image
                src={product.image}
                alt={product.name}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-lg bg-black object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {formatPrice(product.priceInCents * quantity)}
                </span>
              </div>
              <div className="flex items-center rounded-full border">
                <button
                  type="button"
                  onClick={() => onSetQuantity(product.id, quantity - 1)}
                  className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                >
                  {quantity === 1 ? <Trash2 className="size-3.5" /> : <Minus className="size-3.5" />}
                  <span className="sr-only">
                    {quantity === 1 ? `Remove ${product.name}` : `Decrease ${product.name} quantity`}
                  </span>
                </button>
                <span className="w-5 text-center font-mono text-xs" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onSetQuantity(product.id, quantity + 1)}
                  disabled={quantity >= MAX_QUANTITY_PER_ITEM}
                  className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
                  <Plus className="size-3.5" />
                  <span className="sr-only">Increase {product.name} quantity</span>
                </button>
              </div>
            </li>
          ))}
          {lines.length === 0 && (
            <li className="rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground">
              Your cart is empty. Add a product below.
            </li>
          )}
        </ul>

        {suggestions.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Add to your order</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSetQuantity(p.id, 1)}
                  className="flex items-center gap-2 rounded-lg border p-1.5 text-left transition-colors hover:border-primary"
                >
                  <Image
                    src={p.image}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-md bg-black object-cover"
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-xs font-medium">{p.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {formatPrice(p.priceInCents)}
                    </span>
                  </span>
                  <Plus className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="sr-only">Add {p.name} to cart</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-mono">Free</dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd className="font-mono">{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5 text-primary" aria-hidden="true" />
            Payments are encrypted and processed securely by Stripe.
          </p>
        </div>
      </aside>

      <section
        aria-label="Payment details"
        className="hidden min-h-0 overflow-y-auto rounded-2xl border bg-white md:col-span-3 md:block"
      >
        {paymentCart.length > 0 ? (
          <StripeCheckout key={paymentKey} items={paymentCart} />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-sm text-neutral-500">
            Add a product to continue to payment.
          </div>
        )}
      </section>
    </div>
  )
}
