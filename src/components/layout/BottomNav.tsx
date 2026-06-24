'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/codex', label: 'Codex', icon: '📚' },
  { href: '/atlas', label: 'Atlas', icon: '🗺️' },
  { href: '/moi', label: 'Moi', icon: '⛔' },
]

export function BottomNav() {
  const path = usePathname()
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-around px-4"
      style={{
        background: 'linear-gradient(to top, #0D0F1A 70%, rgba(13,15,26,0) 100%)',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        paddingTop: '12px',
      }}
    >
      {NAV.map(n => {
        const active = path.startsWith(n.href)
        return (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              'flex flex-col items-center gap-1 px-8 py-2 rounded-2xl transition-all duration-200',
              active ? 'opacity-100' : 'opacity-30 hover:opacity-55'
            )}
          >
            <span className="text-xl leading-none">{n.icon}</span>
            <span
              className="text-[9px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-cinzel), serif',
                color: active ? '#C9A84C' : 'rgba(255,255,255,0.5)',
              }}
            >
              {n.label}
            </span>
            {active && (
              <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
