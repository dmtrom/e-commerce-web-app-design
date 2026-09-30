import { ShoppingBag } from 'lucide-react'

export type View = 'home' | 'product' | 'checkout'

export function SiteHeader({
  cartCount,
  onHome,
  onOpenCart,
}: {
  cartCount: number
  onHome: () => void
  onOpenCart: () => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-8">
      <button
        type="button"
        onClick={onHome}
        className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
      >
        <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
        node<span className="text-muted-foreground">/labs</span>
      </button>

      <div className="flex items-center gap-6">
        <p className="hidden items-center gap-2 font-mono text-xs text-muted-foreground md:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
          Free shipping worldwide
        </p>
        <button
          type="button"
          onClick={onOpenCart}
          disabled={cartCount === 0}
          className="relative flex size-9 items-center justify-center rounded-full border bg-card transition-colors hover:border-foreground/20 disabled:opacity-50"
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          <span className="sr-only">Open cart, {cartCount} items</span>
          {cartCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-semibold text-primary-foreground"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
