export const media = {
  images: {
    logo: '/images/logo-badge.jpg',
    wordmark: '/images/wordmark-nyaro.png',
    hero: '/images/hero-postcard.jpg',
    neelPair: '/images/neel-pair.jpg',
    neelDetails: ['/images/neel-detail-1.jpg', '/images/neel-detail-2.jpg', '/images/neel-detail-3.jpg', '/images/neel-detail-4.jpg'],
    raas: ['/images/raasnoir-poster-front.jpg', '/images/raasnoir-back.jpg', '/images/raasnoir-mural.jpg', '/images/raasnoir-sofa-1.jpg', '/images/raasnoir-sofa-2.jpg'],
    gulabo: ['/images/gulabo-1.jpg', '/images/gulabo-2.jpg'],
    festive: ['/images/suit-festive-1.jpg', '/images/suit-festive-2.jpg'],
    couple: '/images/sticker-miniature-couple.png',
    scooter: ['/images/sticker-scooter-1.png', '/images/sticker-scooter-2.png'],
  },
  videos: {
    hero: '/videos/reel-hero.mp4',
    neel: '/videos/reel-neel.mp4',
    raas: '/videos/reel-raasnoir.mp4',
    gulabo: '/videos/reel-gulabo.mp4',
    festive: '/videos/reel-festive.mp4',
  },
  posters: {
    hero: '/images/reel-hero-poster.jpg',
    neel: '/images/reel-neel-poster.jpg',
    raas: '/images/reel-raasnoir-poster.jpg',
    gulabo: '/images/reel-gulabo-poster.jpg',
    festive: '/images/reel-festive-poster.jpg',
  },
} as const

export const collections = [
  {
    id: 'neel',
    name: 'Neel',
    tagline: 'stitched, not printed.',
    mood: 'everyday kantha',
  },
  {
    id: 'raas',
    name: 'Raas Noir',
    tagline: 'black shirt, golden hour.',
    mood: 'gold print & night',
  },
  {
    id: 'gulabo',
    name: 'Gulabo',
    tagline: 'pink on pink.',
    mood: 'rose romance',
  },
  {
    id: 'diwali',
    name: 'Diwali Edit',
    tagline: 'Is Diwali, alag dikho.',
    mood: 'festive wear',
    description: 'Mauve festive suit with zari and bead embroidery on the yoke, gold ribbon tie, grey flared bottom.',
    placeholder: 'Roshni Set',
  },
] as const

export const products = [
  { id: 'neel-indigo', name: 'Neel Shirt / Indigo', price: 1899, image: media.images.neelPair, color: 'Indigo', collection: 'neel' },
  { id: 'neel-cream', name: 'Neel Shirt / Cream', price: 2199, image: media.images.neelDetails[1], color: 'Cream', collection: 'neel' },
  { id: 'raas-front', name: 'Raas Noir Shirt / Front', price: 2499, image: media.images.raas[0], color: 'Gold print', collection: 'raas' },
  { id: 'raas-sofa', name: 'Raas Noir Shirt / Sofa', price: 2399, image: media.images.raas[3], color: 'Black', collection: 'raas' },
  { id: 'gulabo-rose', name: 'Gulabo Suit / Rose', price: 2799, image: media.images.gulabo[0], color: 'Rose pink', collection: 'gulabo' },
  { id: 'gulabo-rani', name: 'Gulabo Suit / Rani', price: 3499, image: media.images.gulabo[1], color: 'Gulabo pink', collection: 'gulabo' },
  { id: 'diwali-roshni', name: 'Roshni Set', price: 3499, image: media.images.festive[0], color: 'Mauve & Antique Gold', collection: 'diwali' },
  { id: 'diwali-roshni-dupatta', name: 'Roshni Set with Dupatta', price: 4299, image: media.images.festive[1], color: 'Mauve with Grey Flared Bottom', collection: 'diwali' },
] as const

export const reviews = [
  ['“Kapda pehna toh mummy ne bola — beta, shaadi hai kya?”', 'Rhea, Jaipur'],
  ['“The kind of shirt that starts conversations at chai.”', 'Kabir, Delhi'],
  ['“Gulabo is basically a mood, stitched.”', 'Meher, Mumbai'],
  ['“The zari embroidery on the yoke caught everyone’s eye during Lakshmi Puja.”', 'Aanya, New Delhi'],
]
