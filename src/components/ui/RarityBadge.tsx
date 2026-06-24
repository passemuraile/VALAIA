import { cn } from '@/lib/utils'
import type { MemoryRarity } from '@/types/valaia'

const RARITY_CONFIG: Record<MemoryRarity, { label: string; color: string; bg: string }> = {
  commun:     { label: 'Commun',     color: '#9CA3AF', bg: 'rgba(156,163,175,0.12)' },
  rare:       { label: 'Rare',       color: '#60A5FA', bg: 'rgba(96,165,250,0.12)'  },
  epique:     { label: 'Épique',     color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  legendaire: { label: 'Légendaire', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)'  },
  mythique:   { label: 'Mythique',   color: '#F87171', bg: 'rgba(248,113,113,0.12)' },
}

export function rarityColor(r: MemoryRarity): string {
  return RARITY_CONFIG[r]?.color ?? '#9CA3AF'
}

export function RarityBadge({ rarity, className }: { rarity: MemoryRarity; className?: string }) {
  const cfg = RARITY_CONFIG[rarity]
  if (!cfg) return null
  const isShimmer = rarity === 'legendaire' || rarity === 'mythique'
  return (
    <span
      className={cn('inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide', className)}
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.color}30`,
        ...(isShimmer ? {
          backgroundImage: `linear-gradient(90deg, ${cfg.bg}, ${cfg.color}25, ${cfg.bg})`,
          backgroundSize: '200% auto',
          animation: 'shimmer 2.5s linear infinite',
        } : {}),
      }}
    >
      {cfg.label}
    </span>
  )
}
