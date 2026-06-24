import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        natura:     { DEFAULT: '#10b981', dark: '#064e3b', light: '#6ee7b7' },
        terroir:    { DEFAULT: '#f59e0b', dark: '#78350f', light: '#fcd34d' },
        patrimoine: { DEFAULT: '#3b82f6', dark: '#1e3a5f', light: '#93c5fd' },
        traditions: { DEFAULT: '#f43f5e', dark: '#881337', light: '#fda4af' },
        legendes:   { DEFAULT: '#8b5cf6', dark: '#3b0764', light: '#c4b5fd' },
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':    'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
      },
    },
  },
  plugins: [],
}

export default config
