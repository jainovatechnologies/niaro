'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '@/src/data/niaro'

interface CartContextType {
  cart: string[]
  cartOpen: boolean
  addToCart: (id: string) => void
  removeFromCart: (index: number) => void
  openCart: () => void
  closeCart: () => void
  count: number
  total: number
  items: Array<(typeof products)[number]>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<string[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('niaro-cart') || '[]')
      if (Array.isArray(saved)) setCart(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('niaro-cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  // Scroll lock when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  const addToCart = (id: string) => {
    setCart((prev) => [...prev, id])
    setCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const items = useMemo(() => {
    return cart.map((id) => products.find((p) => p.id === id)!).filter(Boolean)
  }, [cart])

  const count = cart.length
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items])

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        addToCart,
        removeFromCart,
        openCart,
        closeCart,
        count,
        total,
        items,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
