'use client'

import { useState } from 'react'

import { PRODUCTS } from '@/lib/products'
import { MAX_QUANTITY_PER_ITEM, cartCount, type CartItem } from '@/lib/cart'
import { SiteHeader, type View } from '@/components/site-header'
import { HeroView } from '@/components/hero-view'
import { ProductView } from '@/components/product-view'
import { CheckoutView } from '@/components/checkout-view'

export function Storefront() {
  const [view, setView] = useState<View>('home')
  const [productId, setProductId] = useState(PRODUCTS[0].id)
  const [cart, setCart] = useState<CartItem[]>([])
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]

  const openProduct = (id: string) => {
    setProductId(id)
    setView('product')
  }

  const setQuantity = (id: string, quantity: number) => {
    const next = Math.min(Math.max(quantity, 0), MAX_QUANTITY_PER_ITEM)
    setCart((items) => {
      if (next === 0) return items.filter((item) => item.productId !== id)
      if (items.some((item) => item.productId === id)) {
        return items.map((item) => (item.productId === id ? { ...item, quantity: next } : item))
      }
      return [...items, { productId: id, quantity: next }]
    })
  }

  const addToCart = (id: string) => {
    const current = cart.find((item) => item.productId === id)?.quantity ?? 0
    setQuantity(id, current + 1)
  }

  const buyNow = (id: string) => {
    if (!cart.some((item) => item.productId === id)) addToCart(id)
    setView('checkout')
  }

  const count = cartCount(cart)

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader
        cartCount={count}
        onHome={() => setView('home')}
        onOpenCart={() => count > 0 && setView('checkout')}
      />
      <main className="min-h-0 flex-1">
        {view === 'home' && <HeroView onSelectProduct={openProduct} />}
        {view === 'product' && (
          <ProductView
            product={product}
            inCart={cart.find((item) => item.productId === product.id)?.quantity ?? 0}
            onSelectProduct={setProductId}
            onAddToCart={() => addToCart(product.id)}
            onBuyNow={() => buyNow(product.id)}
          />
        )}
        {view === 'checkout' && (
          <CheckoutView
            cart={cart}
            onSetQuantity={setQuantity}
            onBack={() => setView('product')}
          />
        )}
      </main>
    </div>
  )
}
