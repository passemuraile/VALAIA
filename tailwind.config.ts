import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      colors: {
        sommets:     { DEFAULT: '#4A7FA5', dark: '#1A3A5C' },
        lacs:        { DEFAULT: '#2A9D8F', dark: '#0D4A44' },
        bisses:      { DEFAULT: '#3D7A8A', dark: '#1A3D47' },
        gastronomie: { DEFAULT: '#C17F24', dark: '#6B3D0A' },
        traditions:  { DEFAULT: '#8B2FC9', dark: '#3A0D5C' },
        villages:    { DEFAULT: '#8D6E4A', dark: '#3D2B17' },
        vins:        { DEFAULT: '#7B2D42', dark: '#3A0D1E' },
        patrimoine:  { DEFAULT: '#5C7A3E', dark: '#263317' },
        reines:      { DEFAULT: '#C45C1A', dark: '#5C200A' },
        evenements:  { DEFAULT: '#E85D04', dark: '#7B2500' },
        legendes:    { DEFAULT: '#6B5CE7', dark: '#2D1B8C' },
        gold:        { DEFAULT: '#C9A84C', light: '#E8C96A', dark: '#A8833A' },
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out both',
        'slide-up':   'slideUp 0.5s ease-out both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        glowPulse: { '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        float:     { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-5px)' } },
      },
    },
  },
  plugins: [],
}

export default config
