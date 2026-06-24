import type { Metadata, Viewport } from 'next'
import { Inter, Cinzel, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '600', '700'] })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: "VALAIA — L'Atlas Vivant du Valais",
  description: "Explore, découvre et collectionne les trésors du Valais. Le RPG de découverte du canton.",
}

export const viewport: Viewport = {
  themeColor: '#0D0F1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body className="bg-[#0D0F1A] text-white antialiased" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
