'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { Flame, Heart, Moon, Plus, Shirt, Sparkles } from 'lucide-react'
import { products } from '@/src/data/niaro'
import { useCart } from './cart-context'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

const filterChips = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'neel', label: 'Neel', icon: Shirt },
  { id: 'raas', label: 'Raas Noir', icon: Moon },
  { id: 'gulabo', label: 'Gulabo', icon: Heart },
  { id: 'diwali', label: 'Diwali', icon: Flame },
] as const

type FilterType = (typeof filterChips)[number]['id']

export function ShopSection({ initialProducts = products }: { initialProducts?: typeof products }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { addToCart } = useCart()

  // Listen for filter trigger from Diwali section
  useEffect(() => {
    const handleSetFilter = (e: CustomEvent<FilterType>) => {
      if (e.detail) {
        setActiveFilter(e.detail)
      }
    }
    window.addEventListener('niaro-set-filter' as any, handleSetFilter)
    return () => window.removeEventListener('niaro-set-filter' as any, handleSetFilter)
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return initialProducts
    return initialProducts.filter((p) => p.collection === activeFilter)
  }, [activeFilter, initialProducts])

  return (
    <section id="shop" className="shop wrap">
      <div className="section-intro">
        <span className="eyebrow">02 / SHOP THE POSTCARD</span>
        <h2>
          Pick your
          <br />
          <em>postmark.</em>
        </h2>
      </div>

      {/* Filter chips with Lucide icons (no emojis) */}
      <div className="shop-filters" role="tablist" aria-label="Filter products by collection">
        {filterChips.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeFilter === id}
            tabIndex={0}
            className={`filter-chip ${activeFilter === id ? 'active' : ''}`}
            onClick={() => setActiveFilter(id)}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <m.div layout className="product-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p) => (
            <m.article
              layout
              className="product"
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="product-image relative overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={70}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
                <span className="size-note">S · M · L · XL</span>
              </div>
              <div className="product-meta">
                <div>
                  <h4>{p.name}</h4>
                  <p>₹{p.price.toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => addToCart(p.id)}
                  aria-label={`Add ${p.name} to cart`}
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </m.article>
          ))}
        </AnimatePresence>
      </m.div>
    </section>
  )
}
