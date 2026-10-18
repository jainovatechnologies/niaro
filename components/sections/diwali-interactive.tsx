'use client'

import React from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { media } from '@/src/data/niaro'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

export function DiwaliRunningStitch() {
  return (
    <svg className="diwali-stitch-svg" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
      <m.rect
        x="0.8"
        y="0.8"
        width="98.4"
        height="98.4"
        rx="2"
        fill="none"
        stroke="#d4af37"
        strokeWidth="0.5"
        strokeDasharray="2.2 1.6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function DiwaliPolaroidsAndAction() {
  const shopDiwali = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('niaro-set-filter', { detail: 'diwali' }))
      const shopEl = document.getElementById('shop')
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="diwali-details-col">
      <div className="diwali-polaroid-container">
        <div className="diwali-warm-glow" aria-hidden="true" />

        {/* Polaroid 1: Roshni Set */}
        <m.div
          className="diwali-polaroid one"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="polaroid-tape" aria-hidden="true" />
          <div className="polaroid-photo-inner relative overflow-hidden">
            <Image
              src={media.images.festive[0]}
              alt="Diwali Edit Roshni Set festive suit"
              fill
              sizes="(max-width: 768px) 70vw, 30vw"
              quality={70}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
          <span className="polaroid-caption">Roshni Set / Mauve & Zari</span>
        </m.div>

        {/* Polaroid 2: Roshni Set with Dupatta */}
        <m.div
          className="diwali-polaroid two"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="polaroid-tape alt" aria-hidden="true" />
          <div className="polaroid-photo-inner relative overflow-hidden">
            <Image
              src={media.images.festive[1]}
              alt="Diwali Edit Roshni Set with Dupatta detail"
              fill
              sizes="(max-width: 768px) 70vw, 30vw"
              quality={70}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
          <span className="polaroid-caption">Roshni Set + Dupatta / Grey Flare</span>
        </m.div>
      </div>

      <div className="diwali-action-block">
        <p className="diwali-handwritten-note">
          “Is Diwali, alag dikho.”
        </p>
        <p className="diwali-description">
          Mauve festive suit with zari and bead embroidery on the yoke, gold ribbon tie, and grey flared bottom.
        </p>
        <button
          onClick={shopDiwali}
          className="diwali-shop-button"
          aria-label="Shop the Diwali edit collection in the shop grid"
        >
          <span>Shop the Diwali edit</span>
          <ArrowUpRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
