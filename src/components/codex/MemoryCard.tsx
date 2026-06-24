'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Memory, Family } from '@/types/valaia'
import { RarityBadge, rarityColor, rarityGlow } from '@/components/ui/RarityBadge'
import { MapPin, Lock } from 'lucide-react'

interface Props {
  memory: Memory
  family: Family
  discovered: boolean
}

export function MemoryCard({ memory, family, discovered }: Props) {
  const cardColor = rarityColor(memory.rarity)
  const cardGlow  = rarityGlow(memory.rarity)

  return (
    <Link
      href={`/codex/memory/${memory.id}`}
      className={cn(
        'group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300',
        'hover:scale-[1.02] active:scale-[0.98]',
        discovered ? [family.borderClass, cardGlow] : 'border-white/[0.06]',
      )}
    >
      <div
        className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{
          background: discovered
            ? `linear-gradient(135deg, ${family.hex}22 0%, ${cardColor}18 100%)`
            : 'linear-gradient(135deg, #ffffff08 0%, #ffffff04 100%)',
        }}
      >
        <span
          className="absolute bottom-1 right-2 text-5xl font-black opacity-10 tabular-nums select-none"
          style={{ color: discovered ? family.hex : '#fff' }}
        >
          {String(memory.index).padStart(3, '0')}
        </span>

        {discovered ? (
          <span className="text-5xl select-none">{family.emoji}</span>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-40">
            <Lock size={22} className="text-white/50" />
            <span className="text-[10px] text-white/40 text-center px-3 leading-tight">{memory.hint.slice(0, 60)}…</span>
          </div>
        )}
      </div>

      <div className={cn('flex flex-col gap-1.5 p-3', discovered ? 'bg-white/[0.03]' : 'bg-white/[0.015]')}>
        <div className="flex items-start justify-between gap-1">
          <span className={cn('text-sm font-semibold leading-tight', discovered ? 'text-white/90' : 'text-white/30')}>
            {discovered ? memory.name : '???'}
          </span>
          <RarityBadge rarity={memory.rarity} />
        </div>

        {discovered && (
          <>
            <p className="text-[11px] text-white/40 leading-snug">{memory.subtitle}</p>
            <div className="flex items-center gap-1 text-[10px] text-white/30">
              <MapPin size={10} />
              <span>{memory.district}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}
