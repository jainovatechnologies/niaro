import React from 'react'
import Image from 'next/image'
import { media } from '@/src/data/niaro'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

const lookbookItems = [
  { src: media.images.neelPair, caption: 'Neel / 04:32 PM', rot: -3 },
  { src: media.images.raas[2], caption: 'Raas Noir / 11:09 PM', rot: 2 },
  { src: media.images.gulabo[0], caption: 'Gulabo / Sunday', rot: -2 },
  { src: media.images.festive[0], caption: 'Diwali Edit / Festive', rot: 3 },
  { src: media.images.raas[4], caption: 'Jaipur / always', rot: -1 },
]

export default function LookbookSection() {
  return (
    <section id="lookbook" className="lookbook">
      <div className="wrap">
        <div className="section-intro">
          <span className="eyebrow">05 / POSTCARDS FROM THE FIELD</span>
          <h2>
            The lookbook
            <br />
            <em>is looking back.</em>
          </h2>
        </div>
        <div className="look-scroll">
          {lookbookItems.map(({ src, caption, rot }) => (
            <a
              className="polaroid"
              href="https://instagram.com/niaro._"
              target="_blank"
              rel="noopener noreferrer"
              key={src}
              style={{ rotate: `${rot}deg` }}
            >
              <div className="relative overflow-hidden w-full h-[280px]">
                <Image
                  src={src}
                  alt="NIARO lookbook"
                  fill
                  sizes="240px"
                  quality={70}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
              <span>{caption}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
