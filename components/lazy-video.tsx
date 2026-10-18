'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'

// Global manager to guarantee only one video plays at a time
type VideoRegistration = {
  id: string
  pause: () => void
}

const activeVideoRegistry: VideoRegistration[] = []
let currentPlayingId: string | null = null

function registerVideo(reg: VideoRegistration) {
  activeVideoRegistry.push(reg)
  return () => {
    const idx = activeVideoRegistry.findIndex(r => r.id === reg.id)
    if (idx !== -1) activeVideoRegistry.splice(idx, 1)
    if (currentPlayingId === reg.id) currentPlayingId = null
  }
}

function notifyVideoPlaying(id: string) {
  currentPlayingId = id
  activeVideoRegistry.forEach(reg => {
    if (reg.id !== id) {
      reg.pause()
    }
  })
}

export interface LazyVideoProps {
  src: string
  poster: string
  className?: string
  aspectRatio?: string
  ariaLabel?: string
  objectFit?: 'cover' | 'contain'
  preload?: 'none' | 'metadata' | 'auto'
}

export function LazyVideo({
  src,
  poster,
  className = '',
  aspectRatio,
  ariaLabel = 'Video player',
  objectFit = 'cover',
  preload = 'none',
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const idRef = useRef<string>('')

  if (!idRef.current) {
    idRef.current = 'video-' + Math.random().toString(36).substring(2, 9)
  }

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Register in global registry for single-playback
  useEffect(() => {
    const unregister = registerVideo({
      id: idRef.current,
      pause: () => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause()
          setIsPlaying(false)
        }
      },
    })
    return unregister
  }, [])

  // IntersectionObserver (threshold 0.4)
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const handlePlay = () => {
      notifyVideoPlaying(idRef.current)
      const promise = video.play()
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false)
          })
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            if (prefersReducedMotion) {
              return
            }
            if (userInteracted && video.paused) {
              return
            }
            handlePlay()
          } else {
            if (!video.paused) {
              video.pause()
              setIsPlaying(false)
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(container)
    return () => {
      observer.disconnect()
      if (video && !video.paused) {
        video.pause()
      }
    }
  }, [prefersReducedMotion, userInteracted])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    setUserInteracted(true)
    if (video.paused) {
      notifyVideoPlaying(idRef.current)
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`lazy-video-container relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={preload}
        aria-label={ariaLabel}
        className={`w-full h-full object-${objectFit} block`}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className={`lazy-video-control ${
          prefersReducedMotion || !isPlaying ? 'is-visible' : 'auto-fade'
        }`}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-amber-100" aria-hidden="true" />
        ) : (
          <Play className="w-4 h-4 text-amber-100 fill-amber-100 translate-x-[1px]" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

export default LazyVideo
