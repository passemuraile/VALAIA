'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Family } from '@/types/valaia'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface Props {
  family: Family
  discovered: number
}

export function FamilyCard({ family, discovered }: Props) {
  const pct = Math.round((discovered / family.total) * 100)

  return (
    <Link
      href={`/codex/${family.key}`}
      className={cn(
        'group relative flex flex-col gap-3 rounded-2xl border p-5 transition-all duration-300',
        'bg-white/[0.03] hover:bg-white/[0.06]',
        family.borderClass,
        'hover:scale-[1.02] active:scale-[0.98]'
      )}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${family.hex}15 0%, transparent 70%)` }}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-3xl leading-none">{family.emoji}</span>
          <h3 className={cn('mt-2 text-lg font-bold', family.textClass)}>{family.name}</h3>
          <p className="text-xs text-white/40 mt-0.5 leading-snug">{family.tagline}</p>
        </div>
        <div className="text-right shrink-0 ml-3">
          <span className={cn('text-2xl font-black tabular-nums', family.textClass)}>{discovered}</span>
          <span className="text-white/25 text-sm">/{family.total}</span>
        </div>
      </div>

      <ProgressBar value={discovered} max={family.total} color={family.hex} />

      <div className="flex items-center justify-between">
        <span className="text-[11px] text-white/30">{pct}% complété</span>
        <span className={cn('text-[11px] font-medium', family.textClass)}>
          {pct === 100 ? '✦ Complété' : `${family.total - discovered} restant${family.total - discovered > 1 ? 's' : ''}`}
        </span>
      </div>
    </Link>
  )
}
