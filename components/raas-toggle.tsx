'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sun } from 'lucide-react'
import { media } from '@/src/data/niaro'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

export function RaasToggle() {
  const [night, setNight] = useState(false)

  return (
    <article className={`drop raas wrap ${night ? 'is-night' : ''}`}>
      <div className="raas-head">
        <span className="eyebrow">02 — RAAS NOIR</span>
        <button
          className="toggle"
          onClick={() => setNight(!night)}
          aria-label="Toggle day and night view"
        >
          <Sun className="w-4 h-4" aria-hidden="true" />
          <span>{night ? 'Night' : 'Day'}</span>
        </button>
      </div>
      <div className="raas-grid">
        <div className="poster pink">
          RANI
          <br />
          OF
          <br />
          THE
          <br />
          NIGHT
        </div>
        <div className="raas-main relative overflow-hidden">
          <Image
            src={media.images.raas[night ? 1 : 0]}
            alt="Raas Noir black shirt"
            fill
            sizes="(max-width: 768px) 90vw, 42vw"
            quality={70}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
        <div className="poster gold">
          GOLD
          <br />
          IS A
          <br />
          STATE
          <br />
          OF MIND
        </div>
      </div>
      <h3>
        black shirt,
        <br />
        <em>golden hour.</em>
      </h3>
    </article>
  )
}
