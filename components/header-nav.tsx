'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { media } from '@/src/data/niaro'
import { useCart } from './cart-context'

export function HeaderNav() {
  const { openCart, count } = useCart()
  const [menu, setMenu] = useState(false)
  const menuTrigger = useRef<HTMLButtonElement>(null)
  const menuPanel = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setMenu(false)
    menuTrigger.current?.focus()
  }

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menu])

  // Escape key for menu
  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menu])

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand">
          <span className="brand-mark">
            <Image
              src={media.images.logo}
              alt="NIARO Logo"
              width={36}
              height={36}
              priority
              quality={70}
              className="brand-logo-img"
            />
          </span>
          <span>न्यारो</span>
        </a>
        <nav>
          {['Drops', 'Shop', 'Story', 'Craft'].map((x) => (
            <a href={`#${x.toLowerCase()}`} key={x}>
              {x}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="bag"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {count > 0 && <b>{count}</b>}
          </button>
          <button
            ref={menuTrigger}
            className="menu-button"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <m.div
            ref={menuPanel}
            className="mobile-drawer"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          >
            <button onClick={closeMenu} aria-label="Close menu">
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
            <span className="eyebrow">EAST INDIA POST CARD</span>
            {['Drops', 'Shop', 'Story', 'Craft', 'Lookbook'].map((x) => (
              <a href={`#${x.toLowerCase()}`} onClick={closeMenu} key={x}>
                {x}
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
