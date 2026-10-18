'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Minus, ShoppingBag, X } from 'lucide-react'
import { useCart } from './cart-context'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

export function CartDrawer() {
  const { cartOpen, closeCart, count, total, items, removeFromCart } = useCart()
  const cartPanel = useRef<HTMLElement>(null)

  // Escape key handler
  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [cartOpen, closeCart])

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <m.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden="true"
          />
          <m.aside
            ref={cartPanel}
            className="cart-drawer"
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <div className="cart-top">
              <span className="eyebrow">YOUR POSTCARD</span>
              <button onClick={closeCart} aria-label="Close cart">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <h2>
              Cart <em>({count})</em>
            </h2>
            {items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag aria-hidden="true" />
                <p>Your postcard is empty</p>
                <button onClick={closeCart}>
                  Shop the drops <ArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item, i) => (
                    <div className="cart-item" key={`${item.id}-${i}`}>
                      <div className="relative overflow-hidden w-[70px] h-[80px]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="70px"
                          quality={70}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <p>
                        {item.name}
                        <br />
                        <b>₹{item.price.toLocaleString('en-IN')}</b>
                      </p>
                      <button
                        onClick={() => removeFromCart(i)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="order-card">
                  <span className="eyebrow">POST IT FROM JAIPUR</span>
                  <label>
                    Name
                    <input placeholder="Your good name" />
                  </label>
                  <label>
                    Phone
                    <input placeholder="Phone number" />
                  </label>
                  <label>
                    Address
                    <textarea placeholder="Where should we send it?" />
                  </label>
                  <div className="total">
                    <span>Subtotal</span>
                    <b>₹{total.toLocaleString('en-IN')}</b>
                  </div>
                  <a
                    className="ink-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hi NIARO! I would like to order: ${items
                        .map((i) => i.name)
                        .join(', ')}. Total: ₹${total}`
                    )}`}
                  >
                    Post it on WhatsApp <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </>
            )}
          </m.aside>
        </>
      )}
    </AnimatePresence>
  )
}
