import React from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import { media } from '@/src/data/niaro'

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

const instaImages = [
  media.images.neelDetails[0],
  media.images.raas[0],
  media.images.gulabo[0],
  media.images.festive[0],
  media.images.raas[2],
  media.images.festive[1],
]

export default function InstagramSection() {
  return (
    <section className="instagram">
      <div className="wrap insta-head">
        <span className="eyebrow">07 / @NIARO._</span>
        <a
          href="https://instagram.com/niaro._"
          target="_blank"
          rel="noopener noreferrer"
        >
          follow the postcard <Camera className="w-4 h-4 ml-2" aria-hidden="true" />
        </a>
      </div>
      <div className="insta-grid">
        {instaImages.map((src) => (
          <a
            href="https://instagram.com/niaro._"
            target="_blank"
            rel="noopener noreferrer"
            key={src}
            className="relative overflow-hidden w-full h-[180px] block"
          >
            <Image
              src={src}
              alt="NIARO on Instagram"
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              quality={70}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
