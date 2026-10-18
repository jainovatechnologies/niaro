import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Comic_Neue, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-caveat',
})

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-comic-neue',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'NIARO — something different',
  description: 'NIARO is a Jaipur clothing label for the things that look familiar but feel different.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'NIARO — something different',
    description: 'A postcard from Jaipur.',
    images: ['/images/hero-postcard.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIARO — something different',
    description: 'A postcard from Jaipur.',
    images: ['/images/hero-postcard.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#EADFC8',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${comicNeue.variable} ${cormorant.variable}`}
    >
      <body>
        {children}
        <SpeedInsights />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
