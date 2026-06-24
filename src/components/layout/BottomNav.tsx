'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Map, Scroll, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/codex',  icon: BookOpen, label: 'Codex' },
  { href: '/atlas',  icon: Map,      label: 'Atlas'  },
  { href: '/quetes', icon: Scroll,   label: 'Quêtes' },
  { href: '/moi',    icon: User,     label: 'Moi'    },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-[#060608]/95 backdrop-blur-xl border-t border-white/[0.05]" />
      <div className="relative flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 py-3 px-4 min-w-[56px]"
            >
              <div className={cn('w-10 h-8 rounded-xl flex items-center justify-center transition-all duration-150', active ? 'bg-white/10' : '')}>
                <Icon size={19} className={cn('transition-colors duration-150', active ? 'text-white' : 'text-white/30')} />
              </div>
              <span className={cn('text-[10px] font-medium transition-colors duration-150', active ? 'text-white/80' : 'text-white/25')}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
