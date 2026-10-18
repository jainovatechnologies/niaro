import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Camera, ChevronDown, Mail, MapPin, MessageCircle, Pause, Play } from 'lucide-react'
import { media, products } from '@/src/data/niaro'
import { MotionProvider } from '@/components/motion-provider'
import { CartProvider } from '@/components/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { HeaderNav } from '@/components/header-nav'
import { ScrollStitch } from '@/components/scroll-stitch'
import { HeroSection } from '@/components/sections/hero-section'
import { RaasToggle } from '@/components/raas-toggle'
import { ShopSection } from '@/components/shop-section'
import { LazyVideo } from '@/components/lazy-video'
import {
  DiwaliPolaroidsAndAction,
  DiwaliRunningStitch,
} from '@/components/sections/diwali-interactive'

// Dynamic chunk-split sections (SSR enabled)
const LookbookSection = dynamic(
  () => import('@/components/sections/lookbook-section')
)
const NotesSection = dynamic(() => import('@/components/sections/notes-section'))
const InstagramSection = dynamic(
  () => import('@/components/sections/instagram-section')
)
const DiwaliVideoBlock = dynamic(
  () => import('@/components/sections/diwali-video-block')
)

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWFkZmM4Ii8+PC9zdmc+'

function TornEdge({ color = 'var(--kraft)' }: { color?: string }) {
  return <div className="torn-edge" style={{ background: color }} aria-hidden="true" />
}

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

function RangoliMotif({ className = '' }: { className?: string }) {
  return (
    <svg className={`rangoli-motif ${className}`} viewBox="0 0 44 44" width="36" height="36" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="2.2" fill="#c9a24b" />
      <circle cx="22" cy="10" r="1.6" fill="#f26b1d" />
      <circle cx="22" cy="34" r="1.6" fill="#f26b1d" />
      <circle cx="10" cy="22" r="1.6" fill="#f26b1d" />
      <circle cx="34" cy="22" r="1.6" fill="#f26b1d" />
      <circle cx="14" cy="14" r="1.2" fill="#d4af37" />
      <circle cx="30" cy="14" r="1.2" fill="#d4af37" />
      <circle cx="14" cy="30" r="1.2" fill="#d4af37" />
      <circle cx="30" cy="30" r="1.2" fill="#d4af37" />
      <path d="M22 10 Q30 14 34 22 Q30 30 22 34 Q14 30 10 22 Q14 14 22 10 Z" stroke="#c9a24b" strokeWidth="0.9" strokeDasharray="2 2" />
    </svg>
  )
}

export default function Page() {
  return (
    <MotionProvider>
      <CartProvider>
        <ScrollStitch />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <HeaderNav />

        <main id="main-content">
          {/* Hero Section */}
          <HeroSection />

          {/* Marquee banner */}
          <div className="marquee">
            <div>
              NEEL · RAAS NOIR · GULABO · DIWALI EDIT · MADE IN JAIPUR · UDHAAR BAND HAI ·{' '}
            </div>
          </div>

          <TornEdge />

          {/* Drops Container */}
          <section id="drops" className="drops">
            <div className="wrap section-intro">
              <span className="eyebrow">01 / THE DROPS</span>
              <h2>
                Four moods.
                <br />
                <em>One odd little label.</em>
              </h2>
            </div>

            {/* 01 - NEEL (Server rendered static section) */}
            <article className="drop neel wrap">
              <div className="drop-photo relative overflow-hidden">
                <Image
                  src={media.images.neelPair}
                  alt="Two generations wearing Neel shirts"
                  fill
                  sizes="(max-width: 768px) 90vw, 42vw"
                  quality={70}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
                <span className="photo-stamp">
                  STITCHED
                  <br />
                  NOT PRINTED
                </span>
              </div>
              <div className="drop-copy">
                <span className="eyebrow">01 — NEEL</span>
                <h3>
                  stitched,
                  <br />
                  <em>not printed.</em>
                </h3>
                <p>
                  Indigo kantha thread-work for the elder, the youngster, and everyone in between.
                </p>
                <div className="detail-strip">
                  {media.images.neelDetails.slice(0, 3).map((src, i) => (
                    <div key={src} className="relative overflow-hidden">
                      <Image
                        src={src}
                        alt={`Neel detail ${i + 1}`}
                        fill
                        sizes="100px"
                        quality={70}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* 02 - RAAS NOIR (Day/Night interactive leaf) */}
            <RaasToggle />

            {/* 03 - GULABO */}
            <article className="drop gulabo wrap">
              <div className="gulabo-copy">
                <span className="eyebrow">03 — GULABO</span>
                <h3>
                  pink on
                  <br />
                  <em>pink.</em>
                </h3>
                <p>
                  Kurta + dupatta, roses + roses. A little camera-roll romance for your next chai date.
                </p>
                <div className="music">
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Gulabo on Gulabo</span>
                  <Pause className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
              <div className="gulabo-collage">
                <div className="collage-photo one relative overflow-hidden">
                  <Image
                    src={media.images.gulabo[0]}
                    alt="Gulabo pink suit"
                    fill
                    sizes="(max-width: 768px) 80vw, 35vw"
                    quality={70}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                <div className="collage-photo two relative overflow-hidden">
                  <Image
                    src={media.images.gulabo[1]}
                    alt="Gulabo suit detail"
                    fill
                    sizes="(max-width: 768px) 80vw, 35vw"
                    quality={70}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                {/* Gulabo video frame as a small polaroid */}
                <div className="collage-photo three gulabo-video-polaroid">
                  <div className="gulabo-polaroid-inner">
                    <LazyVideo
                      src={media.videos.gulabo}
                      poster={media.posters.gulabo}
                      ariaLabel="Gulabo reel in motion"
                    />
                  </div>
                  <span>Gulabo / in motion</span>
                </div>
              </div>
            </article>

            {/* 04 - DIWALI EDIT (festive suits) */}
            <article className="drop diwali wrap">
              <DiwaliRunningStitch />

              <div className="diwali-header">
                <div className="diwali-header-left">
                  <span className="eyebrow diwali-eyebrow">
                    <DiyaSvg /> 04 — DIWALI EDIT <DiyaSvg className="diya-flame-delay" />
                  </span>
                  <h3 className="diwali-title">
                    deep maroon,
                    <br />
                    <em>antique gold.</em>
                  </h3>
                </div>
                <div className="diwali-header-right">
                  <RangoliMotif />
                  <span className="diwali-mood-tag">FESTIVE WEAR · 2026</span>
                </div>
              </div>

              <div className="diwali-layout">
                {/* Left Column: Big Framed Video in Postcard-with-gold-corners frame (Dynamic Chunk) */}
                <DiwaliVideoBlock />

                {/* Right Column: Overlapping polaroids with tape, warm glow, note & button */}
                <DiwaliPolaroidsAndAction />
              </div>
            </article>
          </section>

          <TornEdge color="var(--terracotta)" />

          {/* Shop Section (Server rendered data with client filter) */}
          <ShopSection initialProducts={products} />

          <TornEdge color="var(--pink)" />

          {/* Story Section (Server rendered) */}
          <section id="story" className="story">
            <div className="wrap story-inner">
              <div>
                <span className="eyebrow">03 / NAAM KA MATLAB</span>
                <h2>
                  It means
                  <br />
                  <em>different.</em>
                </h2>
                <p className="big-note">
                  “for the things that look familiar
                  <br />
                  but feel different.”
                </p>
                <p>
                  NIARO is a Jaipur label for people who like their familiar things with one extra twist. Every line, stitch, and slightly-offbeat detail is made by hand, with a little more feeling than usual.
                </p>
                <span className="scribble">
                  — founder&apos;s note,
                  <br />
                  from a sunny desk
                </span>
              </div>
              <div className="story-badge">
                <span>made by hand</span>
                <div>NI</div>
                <span>in Jaipur</span>
              </div>
            </div>
          </section>

          {/* Craft Section (Server rendered) */}
          <section id="craft" className="craft wrap">
            <div className="section-intro">
              <span className="eyebrow">04 / THE CRAFT</span>
              <h2>
                Made slow.
                <br />
                <em>Worn loud.</em>
              </h2>
            </div>
            <div className="craft-steps">
              {[
                ['01', 'Design', 'A sketch, a chai, one very specific shade of pink.'],
                ['02', 'Thread-work', 'Kantha lines that wander like a good story.'],
                ['03', 'Stitched in Jaipur', 'Finished by hands that know the cloth by heart.'],
              ].map(([n, title, copy]) => (
                <div className="craft-step" key={n}>
                  <b>{n}</b>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <p className="craft-footer">Udhaar band hai, order chalu hai.</p>
          </section>

          {/* Below-the-fold dynamic chunks */}
          <LookbookSection />
          <NotesSection />
          <InstagramSection />
        </main>

        {/* Footer (Server rendered) */}
        <footer>
          <div className="wrap footer-inner">
            <div className="footer-brand-mark">
              <Image
                src={media.images.logo}
                alt="NIARO Logo"
                width={68}
                height={68}
                quality={70}
                loading="lazy"
                className="footer-logo-img"
              />
            </div>
            <h2>NIARO</h2>
            <p>
              Made in Jaipur.
              <br />
              Sent with feeling.
            </p>
            <div className="footer-contact">
              <a
                href="https://instagram.com/niaro._"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera className="w-4 h-4 mr-1" aria-hidden="true" /> Instagram
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-1" aria-hidden="true" /> WhatsApp
              </a>
              <a href="mailto:hello@niaro.example">
                <Mail className="w-4 h-4 mr-1" aria-hidden="true" /> hello@niaro.example
              </a>
              <span>
                <MapPin className="w-4 h-4 mr-1" aria-hidden="true" /> Jaipur, Rajasthan
              </span>
            </div>
            <div className="footer-links">
              <a href="#shop">Shop</a>
              <a href="#story">Story</a>
              <a href="#craft">Craft</a>
              <a href="#top">
                Back to top <ChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
              </a>
            </div>
            <small>© 2026 NIARO. Concept by Jainova Technologies.</small>
          </div>
        </footer>

        {/* WhatsApp floating button */}
        <a
          className="whatsapp-float"
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
        </a>

        {/* Cart Drawer */}
        <CartDrawer />
      </CartProvider>
    </MotionProvider>
  )
}
