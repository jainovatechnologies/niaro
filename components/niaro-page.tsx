'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronDown,
  Flame,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  Pause,
  Play,
  Plus,
  Shirt,
  ShoppingBag,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { media, products, reviews } from '@/src/data/niaro'
import { LazyVideo } from './lazy-video'

function Asset({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [missing, setMissing] = useState(false)
  if (missing) return <div className={`asset-missing ${className}`} aria-label={`${alt} unavailable`}><span>{src.split('/').pop()}</span></div>
  return <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 42vw" className={`object-cover ${className}`} onError={() => setMissing(true)} />
}

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

const filterChips = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'neel', label: 'Neel', icon: Shirt },
  { id: 'raas', label: 'Raas Noir', icon: Moon },
  { id: 'gulabo', label: 'Gulabo', icon: Heart },
  { id: 'diwali', label: 'Diwali', icon: Flame },
] as const

type FilterType = (typeof filterChips)[number]['id']

export default function NiaroPage() {
  const [intro, setIntro] = useState(true)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<string[]>([])
  const [menu, setMenu] = useState(false)
  const [night, setNight] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const cartTrigger = useRef<HTMLButtonElement>(null)
  const menuTrigger = useRef<HTMLButtonElement>(null)
  const cartPanel = useRef<HTMLElement>(null)
  const menuPanel = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('niaro-seen')
      if (seen) setIntro(false)
    } catch {
      setIntro(false)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = intro || cartOpen || menu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [intro, cartOpen, menu])

  useEffect(() => {
    if (!cartOpen && !menu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cartOpen ? closeCart() : closeMenu()
      if (e.key !== 'Tab') return
      const panel = cartOpen ? cartPanel.current : menuPanel.current
      if (!panel) return
      const els = panel.querySelectorAll<HTMLElement>('button,a,input,textarea')
      if (!els.length) return
      if (e.shiftKey && document.activeElement === els[0]) {
        e.preventDefault()
        els[els.length - 1].focus()
      } else if (!e.shiftKey && document.activeElement === els[els.length - 1]) {
        e.preventDefault()
        els[0].focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [cartOpen, menu])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('niaro-cart') || '[]')
      if (Array.isArray(saved)) setCart(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('niaro-cart', JSON.stringify(cart))
    } catch {}
  }, [cart])

  const closeCart = () => {
    setCartOpen(false)
    cartTrigger.current?.focus()
  }

  const closeMenu = () => {
    setMenu(false)
    menuTrigger.current?.focus()
  }

  const openIntro = () => {
    try {
      sessionStorage.setItem('niaro-seen', '1')
    } catch {}
    setIntroLeaving(true)
    window.setTimeout(() => setIntro(false), 1800)
  }

  const add = (id: string) => {
    setCart(c => [...c, id])
    setCartOpen(true)
  }

  const items = useMemo(() => cart.map(id => products.find(p => p.id === id)!).filter(Boolean), [cart])
  const count = cart.length
  const total = items.reduce((sum, item) => sum + item.price, 0)

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products
    return products.filter(p => p.collection === activeFilter)
  }, [activeFilter])

  const shopDiwali = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setActiveFilter('diwali')
    const shopEl = document.getElementById('shop')
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.div className="scroll-stitch" style={{ scaleX: progress }} />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <AnimatePresence>
        {intro && (
          <motion.div
            className="intro"
            role="dialog"
            aria-label="NIARO postcard introduction"
            initial={{ opacity: 1 }}
            animate={{ opacity: introLeaving ? 0 : 1 }}
            transition={{ duration: introLeaving ? 1.8 : 0.3 }}
          >
            <motion.div
              className="envelope"
              tabIndex={0}
              role="button"
              aria-label="Open NIARO postcard"
              onClick={openIntro}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openIntro()}
              animate={introLeaving ? { scale: 1.15, y: '-35vh', rotate: -2 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="seal" aria-hidden="true">NI</div>
              <div className="postmark">JAIPUR<br /><small>2026</small></div>
              <div className="flap" />
              <div className="intro-card">
                <b>NIARO</b>
                <span>Jaipur · 2026</span>
              </div>
            </motion.div>
            <p>Tap to open</p>
            <button className="intro-skip" onClick={openIntro}>Skip</button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="nav">
        <a href="#top" className="brand">
          <span className="brand-mark">
            <Image
              src={media.images.logo}
              alt="NIARO Logo"
              width={36}
              height={36}
              priority
              className="brand-logo-img"
            />
          </span>
          <span>न्यारो</span>
        </a>
        <nav>
          {['Drops', 'Shop', 'Story', 'Craft'].map(x => (
            <a href={`#${x.toLowerCase()}`} key={x}>{x}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button ref={cartTrigger} className="bag" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`}>
            <ShoppingBag aria-hidden="true" />
            {count > 0 && <b>{count}</b>}
          </button>
          <button ref={menuTrigger} className="menu-button" onClick={() => setMenu(true)} aria-label="Open menu">
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            ref={menuPanel}
            className="mobile-drawer"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
          >
            <button onClick={closeMenu} aria-label="Close menu">
              <X aria-hidden="true" />
            </button>
            <span className="eyebrow">EAST INDIA POST CARD</span>
            {['Drops', 'Shop', 'Story', 'Craft', 'Lookbook'].map(x => (
              <a href={`#${x.toLowerCase()}`} onClick={closeMenu} key={x}>{x}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
        <section id="top" className="hero wrap">
          <div className="hero-copy">
            <span className="eyebrow">A POSTCARD FROM JAIPUR · 2026</span>
            <h1>Something<br /><em>different.</em></h1>
            <p>for the things that look familiar but feel different.</p>
            <a className="ink-button" href="#shop">
              Shop the drop <ArrowUpRight aria-hidden="true" />
            </a>
            <span className="scribble">Alag dikhna<br />crime nahi hai.</span>
          </div>
          <div className="hero-postcard">
            <div className="postmark">JAIPUR<br /><small>2026</small></div>
            <span className="postcard-label">POST CARD</span>
            <div className="hero-image">
              <Asset src={media.images.hero} alt="NIARO clothing in Jaipur" />
              <div className="image-caption">handmade, thoda hatke</div>
            </div>
            <div className="stamp">NI<small>NIARO</small></div>
          </div>
        </section>

        <div className="marquee">
          <div>NEEL · RAAS NOIR · GULABO · DIWALI EDIT · MADE IN JAIPUR · UDHAAR BAND HAI · </div>
        </div>

        <TornEdge />

        <section id="drops" className="drops">
          <div className="wrap section-intro">
            <span className="eyebrow">01 / THE DROPS</span>
            <h2>Four moods.<br /><em>One odd little label.</em></h2>
          </div>

          {/* 01 - NEEL */}
          <article className="drop neel wrap">
            <div className="drop-photo">
              <Asset src={media.images.neelPair} alt="Two generations wearing Neel shirts" />
              <span className="photo-stamp">STITCHED<br />NOT PRINTED</span>
            </div>
            <div className="drop-copy">
              <span className="eyebrow">01 — NEEL</span>
              <h3>stitched,<br /><em>not printed.</em></h3>
              <p>Indigo kantha thread-work for the elder, the youngster, and everyone in between.</p>
              <div className="detail-strip">
                {media.images.neelDetails.slice(0, 3).map((src, i) => (
                  <div key={src}>
                    <Asset src={src} alt={`Neel detail ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* 02 - RAAS NOIR */}
          <article className={`drop raas wrap ${night ? 'is-night' : ''}`}>
            <div className="raas-head">
              <span className="eyebrow">02 — RAAS NOIR</span>
              <button className="toggle" onClick={() => setNight(!night)} aria-label="Toggle day and night view">
                <Sun aria-hidden="true" />
                <span>{night ? 'Night' : 'Day'}</span>
              </button>
            </div>
            <div className="raas-grid">
              <div className="poster pink">RANI<br />OF<br />THE<br />NIGHT</div>
              <div className="raas-main">
                <Asset src={media.images.raas[night ? 1 : 0]} alt="Raas Noir black shirt" />
              </div>
              <div className="poster gold">GOLD<br />IS A<br />STATE<br />OF MIND</div>
            </div>
            <h3>black shirt,<br /><em>golden hour.</em></h3>
          </article>

          {/* 03 - GULABO */}
          <article className="drop gulabo wrap">
            <div className="gulabo-copy">
              <span className="eyebrow">03 — GULABO</span>
              <h3>pink on<br /><em>pink.</em></h3>
              <p>Kurta + dupatta, roses + roses. A little camera-roll romance for your next chai date.</p>
              <div className="music">
                <Play aria-hidden="true" />
                <span>Gulabo on Gulabo</span>
                <Pause aria-hidden="true" />
              </div>
            </div>
            <div className="gulabo-collage">
              <div className="collage-photo one">
                <Asset src={media.images.gulabo[0]} alt="Gulabo pink suit" />
              </div>
              <div className="collage-photo two">
                <Asset src={media.images.gulabo[1]} alt="Gulabo suit detail" />
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
            {/* The gold running-stitch border that draws itself */}
            <svg className="diwali-stitch-svg" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
              <motion.rect
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
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </svg>

            <div className="diwali-header">
              <div className="diwali-header-left">
                <span className="eyebrow diwali-eyebrow">
                  <DiyaSvg /> 04 — DIWALI EDIT <DiyaSvg className="diya-flame-delay" />
                </span>
                <h3 className="diwali-title">
                  deep maroon,<br /><em>antique gold.</em>
                </h3>
              </div>
              <div className="diwali-header-right">
                <RangoliMotif />
                <span className="diwali-mood-tag">FESTIVE WEAR · 2026</span>
              </div>
            </div>

            <div className="diwali-layout">
              {/* Left Column: Big Framed Video in Postcard-with-gold-corners frame */}
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

              {/* Right Column: Overlapping polaroids with tape, warm glow, note & button */}
              <div className="diwali-details-col">
                <div className="diwali-polaroid-container">
                  <div className="diwali-warm-glow" aria-hidden="true" />

                  {/* Polaroid 1: Roshni Set */}
                  <motion.div
                    className="diwali-polaroid one"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="polaroid-tape" aria-hidden="true" />
                    <div className="polaroid-photo-inner">
                      <Asset src={media.images.festive[0]} alt="Diwali Edit Roshni Set festive suit" />
                    </div>
                    <span className="polaroid-caption">Roshni Set / Mauve & Zari</span>
                  </motion.div>

                  {/* Polaroid 2: Roshni Set with Dupatta */}
                  <motion.div
                    className="diwali-polaroid two"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.28 }}
                  >
                    <div className="polaroid-tape alt" aria-hidden="true" />
                    <div className="polaroid-photo-inner">
                      <Asset src={media.images.festive[1]} alt="Diwali Edit Roshni Set with Dupatta detail" />
                    </div>
                    <span className="polaroid-caption">Roshni Set + Dupatta / Grey Flare</span>
                  </motion.div>
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
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </section>

        <TornEdge color="var(--terracotta)" />

        {/* SHOP SECTION */}
        <section id="shop" className="shop wrap">
          <div className="section-intro">
            <span className="eyebrow">02 / SHOP THE POSTCARD</span>
            <h2>Pick your<br /><em>postmark.</em></h2>
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

          <motion.div layout className="product-grid">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(p => (
                <motion.article
                  layout
                  className="product"
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="product-image">
                    <Asset src={p.image} alt={p.name} />
                    <span className="size-note">S · M · L · XL</span>
                  </div>
                  <div className="product-meta">
                    <div>
                      <h4>{p.name}</h4>
                      <p>₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button onClick={() => add(p.id)} aria-label={`Add ${p.name} to cart`}>
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <TornEdge color="var(--pink)" />

        <section id="story" className="story">
          <div className="wrap story-inner">
            <div>
              <span className="eyebrow">03 / NAAM KA MATLAB</span>
              <h2>It means<br /><em>different.</em></h2>
              <p className="big-note">“for the things that look familiar<br />but feel different.”</p>
              <p>NIARO is a Jaipur label for people who like their familiar things with one extra twist. Every line, stitch, and slightly-offbeat detail is made by hand, with a little more feeling than usual.</p>
              <span className="scribble">— founder&apos;s note,<br />from a sunny desk</span>
            </div>
            <div className="story-badge">
              <span>made by hand</span>
              <div>NI</div>
              <span>in Jaipur</span>
            </div>
          </div>
        </section>

        <section id="craft" className="craft wrap">
          <div className="section-intro">
            <span className="eyebrow">04 / THE CRAFT</span>
            <h2>Made slow.<br /><em>Worn loud.</em></h2>
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

        <section id="lookbook" className="lookbook">
          <div className="wrap">
            <div className="section-intro">
              <span className="eyebrow">05 / POSTCARDS FROM THE FIELD</span>
              <h2>The lookbook<br /><em>is looking back.</em></h2>
            </div>
            <div className="look-scroll">
              {[media.images.neelPair, media.images.raas[2], media.images.gulabo[0], media.images.festive[0], media.images.raas[4]].map((src, i) => (
                <a
                  className="polaroid"
                  href="https://instagram.com/niaro._"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={src}
                  style={{ rotate: `${[-3, 2, -2, 3, -1][i]}deg` }}
                >
                  <div>
                    <Asset src={src} alt="NIARO lookbook" />
                  </div>
                  <span>{['Neel / 04:32 PM', 'Raas Noir / 11:09 PM', 'Gulabo / Sunday', 'Diwali Edit / Festive', 'Jaipur / always'][i]}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="notes wrap">
          <div className="section-intro">
            <span className="eyebrow">06 / NOTES FROM CUSTOMERS</span>
            <h2>Postcards<br /><em>we kept.</em></h2>
          </div>
          <div className="reviews">
            {reviews.map(([quote, name], i) => (
              <div className="review" key={name} style={{ rotate: `${[-3, 2, -1, 3][i]}deg` }}>
                <span>NI</span>
                <p>{quote}</p>
                <small>{name}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="instagram">
          <div className="wrap insta-head">
            <span className="eyebrow">07 / @NIARO._</span>
            <a href="https://instagram.com/niaro._" target="_blank" rel="noopener noreferrer">
              follow the postcard <Camera aria-hidden="true" />
            </a>
          </div>
          <div className="insta-grid">
            {[
              media.images.neelDetails[0],
              media.images.raas[0],
              media.images.gulabo[0],
              media.images.festive[0],
              media.images.raas[2],
              media.images.festive[1],
            ].map(src => (
              <a href="https://instagram.com/niaro._" target="_blank" rel="noopener noreferrer" key={src}>
                <Asset src={src} alt="NIARO on Instagram" />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <div className="footer-brand-mark">
            <Image
              src={media.images.logo}
              alt="NIARO Logo"
              width={68}
              height={68}
              className="footer-logo-img"
            />
          </div>
          <h2>NIARO</h2>
          <p>Made in Jaipur.<br />Sent with feeling.</p>
          <div className="footer-contact">
            <a href="https://instagram.com/niaro._" target="_blank" rel="noopener noreferrer">
              <Camera aria-hidden="true" /> Instagram
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" /> WhatsApp
            </a>
            <a href="mailto:hello@niaro.example">
              <Mail aria-hidden="true" /> hello@niaro.example
            </a>
            <span>
              <MapPin aria-hidden="true" /> Jaipur, Rajasthan
            </span>
          </div>
          <div className="footer-links">
            <a href="#shop">Shop</a>
            <a href="#story">Story</a>
            <a href="#craft">Craft</a>
            <a href="#top">
              Back to top <ChevronDown aria-hidden="true" />
            </a>
          </div>
          <small>© 2026 NIARO. Concept by Jainova Technologies.</small>
        </div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              aria-hidden="true"
            />
            <motion.aside
              ref={cartPanel}
              className="cart-drawer"
              role="dialog"
              aria-label="Shopping cart"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <div className="cart-top">
              <span className="eyebrow">YOUR POSTCARD</span>
              <button onClick={closeCart} aria-label="Close cart">
                <X aria-hidden="true" />
              </button>
            </div>
            <h2>Cart <em>({count})</em></h2>
            {items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag aria-hidden="true" />
                <p>Your postcard is empty</p>
                <button onClick={closeCart}>
                  Shop the drops <ArrowRight aria-hidden="true" />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item, i) => (
                    <div className="cart-item" key={`${item.id}-${i}`}>
                      <div>
                        <Asset src={item.image} alt={item.name} />
                      </div>
                      <p>
                        {item.name}
                        <br />
                        <b>₹{item.price.toLocaleString('en-IN')}</b>
                      </p>
                      <button onClick={() => setCart(c => c.filter((_, j) => j !== i))} aria-label={`Remove ${item.name}`}>
                        <Minus aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="order-card">
                  <span className="eyebrow">POST IT FROM JAIPUR</span>
                  <label>
                    Name
                    <input placeholder="Your good name" />
                  </label>
                  <label>
                    Phone
                    <input placeholder="Phone number" />
                  </label>
                  <label>
                    Address
                    <textarea placeholder="Where should we send it?" />
                  </label>
                  <div className="total">
                    <span>Subtotal</span>
                    <b>₹{total.toLocaleString('en-IN')}</b>
                  </div>
                  <a
                    className="ink-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hi NIARO! I would like to order: ${items.map(i => i.name).join(', ')}. Total: ₹${total}`
                    )}`}
                  >
                    Post it on WhatsApp <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </>
            )}
          </motion.aside>
        </>
        )}
      </AnimatePresence>
    </>
  )
}
