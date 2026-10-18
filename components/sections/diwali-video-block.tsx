'use client'

import React from 'react'
import { media } from '@/src/data/niaro'
import { LazyVideo } from '@/components/lazy-video'

function DiyaSvg({ className = '' }: { className?: string }) {
  return (
    <svg className={`diya-svg ${className}`} viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
      <path d="M6 18 C6 25, 26 25, 26 18 C26 16, 23 15, 16 15 C9 15, 6 16, 6 18 Z" fill="#c9a24b" stroke="#e8c77b" strokeWidth="0.8" />
      <ellipse cx="16" cy="18" rx="8" ry="2.2" fill="#8c2a38" />
      <g className="diya-flame">
        <path d="M16 4 C18 8, 20.5 10.5, 20.5 13.5 C20.5 16, 18.5 17.5, 16 17.5 C13.5 17.5, 11.5 16, 11.5 13.5 C11.5 10.5, 14 8, 16 4 Z" fill="#f26b1d" />
        <path d="M16 7 C17.2 9.5, 18.5 11, 18.5 13 C18.5 14.5, 17.4 15.5, 16 15.5 C14.6 15.5, 13.5 14.5, 13.5 13 C13.5 11, 14.8 9.5, 16 7 Z" fill="#fef08a" />
      </g>
    </svg>
  )
}

export default function DiwaliVideoBlock() {
  return (
    <div className="diwali-video-col">
      <div className="postcard-video-frame">
        <span className="gold-corner tl" aria-hidden="true" />
        <span className="gold-corner tr" aria-hidden="true" />
        <span className="gold-corner bl" aria-hidden="true" />
        <span className="gold-corner br" aria-hidden="true" />

        <div className="postcard-video-top">
          <span className="postcard-video-stamp">JAIPUR · DIWALI 2026</span>
          <span className="postcard-video-postmark">FESTIVE POSTCARD</span>
        </div>

        <div className="postcard-video-media">
          <LazyVideo
            src={media.videos.festive}
            poster={media.posters.festive}
            ariaLabel="Diwali Edit festive suit reel video"
          />
        </div>

        <div className="postcard-video-bottom">
          <span className="postcard-video-caption">mauve silk · zari yoke · bead embroidery</span>
          <DiyaSvg />
        </div>
      </div>
    </div>
  )
}
