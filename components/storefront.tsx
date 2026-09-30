'use client'

import { useState } from 'react'

import { PRODUCTS } from '@/lib/products'
import { SiteHeader, type View } from '@/components/site-header'
import { HeroView } from '@/components/hero-view'
import { ProductView } from '@/components/product-view'
import { CheckoutView } from '@/components/checkout-view'

export function Storefront() {
  const [view, setView] = useState<View>('home')
  const [productId, setProductId] = useState(PRODUCTS[0].id)
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]

  const openProduct = (id: string) => {
    setProductId(id)
    setView('product')
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader view={view} onNavigate={setView} />
      <main className="min-h-0 flex-1">
        {view === 'home' && <HeroView onSelectProduct={openProduct} />}
        {view === 'product' && (
          <ProductView
            product={product}
            onSelectProduct={setProductId}
            onBuyNow={() => setView('checkout')}
          />
        )}
        {view === 'checkout' && (
          <CheckoutView product={product} onBack={() => setView('product')} />
        )}
      </main>
    </div>
  )
}
