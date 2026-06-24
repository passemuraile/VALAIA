import { cn } from '@/lib/utils'
import type { MemoryRarity } from '@/types/valaia'

const CONFIG: Record<MemoryRarity, { label: string; classes: string }> = {
  commun:     { label: 'Commun',     classes: 'bg-zinc-700/60 text-zinc-300 border-zinc-600/40' },
  rare:       { label: 'Rare',       classes: 'bg-blue-900/60 text-blue-300 border-blue-500/40' },
  epique:     { label: 'Épique',     classes: 'bg-violet-900/60 text-violet-300 border-violet-500/40' },
  legendaire: { label: 'Légendaire', classes: 'bg-amber-900/60 text-amber-300 border-amber-500/40' },
  mythique:   { label: 'Mythique',   classes: 'bg-rose-900/60 text-rose-300 border-rose-500/40' },
}

export function RarityBadge({ rarity, className }: { rarity: MemoryRarity; className?: string }) {
  const { label, classes } = CONFIG[rarity]
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border', classes, className)}>
      {label}
    </span>
  )
}

export function rarityGlow(rarity: MemoryRarity): string {
  return {
    commun:     '',
    rare:       'shadow-[0_0_20px_-6px_#3b82f6]',
    epique:     'shadow-[0_0_20px_-6px_#8b5cf6]',
    legendaire: 'shadow-[0_0_24px_-6px_#f59e0b]',
    mythique:   'shadow-[0_0_28px_-6px_#f43f5e]',
  }[rarity]
}

export function rarityColor(rarity: MemoryRarity): string {
  return {
    commun:     '#71717a',
    rare:       '#3b82f6',
    epique:     '#8b5cf6',
    legendaire: '#f59e0b',
    mythique:   '#f43f5e',
  }[rarity]
}
