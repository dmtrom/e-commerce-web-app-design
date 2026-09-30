import Image from 'next/image'
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PRODUCTS, formatPrice, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

const PERKS = [
  { icon: Truck, label: 'Ships in 24h' },
  { icon: RotateCcw, label: '30-day returns' },
  { icon: ShieldCheck, label: '2-year warranty' },
]

export function ProductView({
  product,
  onSelectProduct,
  onBuyNow,
}: {
  product: Product
  onSelectProduct: (id: string) => void
  onBuyNow: () => void
}) {
  return (
    <div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-8">
      <div className="relative hidden overflow-hidden rounded-2xl border bg-black md:block">
        <Image
          key={product.id}
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="50vw"
          className="object-cover animate-in fade-in duration-500"
        />
        <span className="absolute left-4 top-4 rounded-full border bg-background/70 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          SKU / {product.id.toUpperCase()}
        </span>
      </div>

      <section className="flex min-h-0 flex-col justify-between gap-5 rounded-2xl border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                {product.tagline}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
            </div>
            <p className="font-mono text-2xl font-semibold md:text-3xl">
              {formatPrice(product.priceInCents)}
            </p>
          </div>
          <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {product.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-1 bg-card p-3">
              <dt className="text-xs text-muted-foreground">{spec.label}</dt>
              <dd className="font-mono text-sm font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-xs text-muted-foreground">Choose a product</legend>
          <div className="grid grid-cols-3 gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(p.id)}
                aria-pressed={p.id === product.id}
                className={cn(
                  'flex items-center gap-2 rounded-lg border p-1.5 text-left transition-colors',
                  p.id === product.id
                    ? 'border-primary bg-accent'
                    : 'hover:border-foreground/20',
                )}
              >
                <Image
                  src={p.image}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-md bg-black object-cover"
                />
                <span className="truncate text-xs font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="h-12 w-full text-base" onClick={onBuyNow}>
            Buy Now — {formatPrice(product.priceInCents)}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <ul className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
            {PERKS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="size-3.5 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
