'use client'
import Link from 'next/link'
import type { Memory, Family } from '@/types/valaia'
import { RarityBadge } from '@/components/ui/RarityBadge'

interface Props {
  memory: Memory
  family: Family
  discovered: boolean
}

export function MemoryCard({ memory, family, discovered }: Props) {
  return (
    <Link href={`/codex/memory/${memory.id}`} className="memory-card block">
      <div
        className="relative rounded-xl overflow-hidden p-3.5 flex items-center gap-3"
        style={{
          border: discovered ? `1px solid ${family.hex}25` : '1px solid rgba(255,255,255,0.05)',
          background: discovered
            ? `linear-gradient(135deg, ${family.hex}0C 0%, transparent 100%)`
            : 'rgba(255,255,255,0.02)',
        }}
      >
        {/* Left indicator */}
        <div
          className="w-1 h-10 rounded-full flex-shrink-0"
          style={{ background: discovered ? family.hex : 'rgba(255,255,255,0.08)' }}
        />

        {/* Index */}
        <span className="text-[10px] tabular-nums text-white/20 w-6 flex-shrink-0">
          #{String(memory.index).padStart(2, '0')}
        </span>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium leading-tight ${
            discovered ? 'text-white' : 'text-white/25'
          }`}>
            {discovered ? memory.name : '??? — Inconnue'}
          </p>
          {discovered && (
            <p className="text-[11px] text-white/30 mt-0.5 truncate">{memory.subtitle}</p>
          )}
        </div>

        {/* Rarity + XP */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <RarityBadge rarity={memory.rarity} />
          <span className="text-[10px] text-white/20 tabular-nums">+{memory.xpReward} XP</span>
        </div>

        {/* Lock overlay for undiscovered */}
        {!discovered && (
          <span className="absolute inset-0 flex items-center justify-center text-white/10 text-2xl pointer-events-none">
          </span>
        )}
      </div>
    </Link>
  )
}
