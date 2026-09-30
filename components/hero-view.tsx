import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PRODUCTS, formatPrice } from '@/lib/products'

const STATS = [
  { value: '42K+', label: 'Devs shipping' },
  { value: '4.9/5', label: 'Avg. rating' },
  { value: '2 yr', label: 'Warranty' },
]

export function HeroView({ onSelectProduct }: { onSelectProduct: (id: string) => void }) {
  const [featured, ...rest] = PRODUCTS

  return (
    <div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-8">
      <section className="flex flex-col justify-between rounded-2xl border bg-card p-6 md:p-10">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            K1 v2 now shipping
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Hardware for people who ship.
          </h1>
          <p className="max-w-md text-pretty text-muted-foreground md:text-lg">
            Precision desk tools engineered for developers. Fewer cables, faster input, zero
            distractions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => onSelectProduct(featured.id)}>
              Shop the {featured.name}
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onSelectProduct(rest[0].id)}>
              Explore lineup
            </Button>
          </div>
        </div>

        <dl className="hidden grid-cols-3 gap-4 border-t pt-6 md:grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="order-2 text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 font-mono text-2xl font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Product lineup" className="hidden min-h-0 grid-rows-5 gap-4 md:grid">
        <button
          type="button"
          onClick={() => onSelectProduct(featured.id)}
          className="group relative row-span-3 overflow-hidden rounded-2xl border bg-black text-left"
        >
          <Image
            src={featured.image}
            alt={featured.name}
            fill
            priority
            sizes="50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <ProductCaption name={featured.name} tagline={featured.tagline} price={featured.priceInCents} />
        </button>
        <div className="row-span-2 grid grid-cols-2 gap-4">
          {rest.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectProduct(product.id)}
              className="group relative overflow-hidden rounded-2xl border bg-black text-left"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <ProductCaption name={product.name} tagline={product.tagline} price={product.priceInCents} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function ProductCaption({ name, tagline, price }: { name: string; tagline: string; price: number }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/90 to-transparent p-4">
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{tagline}</span>
      </div>
      <span className="flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 font-mono text-xs backdrop-blur">
        {formatPrice(price)}
        <ArrowUpRight className="size-3 text-primary" aria-hidden="true" />
      </span>
    </div>
  )
}
