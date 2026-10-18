'use client'

import React from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { media } from '@/src/data/niaro'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

export function HeroSection() {
  return (
    <section id="top" className="hero wrap">
      <m.div
        className="hero-copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow">A POSTCARD FROM JAIPUR · 2026</span>
        <h1>
          Something
          <br />
          <em>different.</em>
        </h1>
        <p>for the things that look familiar but feel different.</p>
        <a className="ink-button" href="#shop">
          Shop the drop <ArrowUpRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </a>
        <span className="scribble">
          Alag dikhna
          <br />
          crime nahi hai.
        </span>
      </m.div>

      <m.div
        className="hero-postcard"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="postmark">
          JAIPUR
          <br />
          <small>2026</small>
        </div>
        <span className="postcard-label">POST CARD</span>
        <div className="hero-image relative overflow-hidden">
          <Image
            src={media.images.hero}
            alt="NIARO clothing in Jaipur"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 42vw"
            quality={70}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="image-caption">handmade, thoda hatke</div>
        </div>
        <div className="stamp">
          NI<small>NIARO</small>
        </div>
      </m.div>
    </section>
  )
}
