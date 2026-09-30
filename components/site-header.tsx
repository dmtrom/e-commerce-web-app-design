import { cn } from '@/lib/utils'

export type View = 'home' | 'product' | 'checkout'

const STEPS: { id: View; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'checkout', label: 'Checkout' },
]

export function SiteHeader({
  view,
  onNavigate,
}: {
  view: View
  onNavigate: (view: View) => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-8">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
      >
        <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
        node<span className="text-muted-foreground">/labs</span>
      </button>

      <nav aria-label="Store steps">
        <ol className="flex items-center gap-1 rounded-full border bg-card p-1">
          {STEPS.map((step, i) => (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onNavigate(step.id)}
                aria-current={view === step.id ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors',
                  view === step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="hidden font-mono opacity-70 sm:inline">0{i + 1}</span>
                {step.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <p className="hidden items-center gap-2 font-mono text-xs text-muted-foreground md:flex">
        <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
        Free shipping worldwide
      </p>
    </header>
  )
}
