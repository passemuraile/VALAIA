'use client'
import Link from 'next/link'
import type { Family } from '@/types/valaia'

interface Props {
  family: Family
  discovered: number
}

export function FamilyCard({ family, discovered }: Props) {
  const pct = family.total > 0 ? (discovered / family.total) * 100 : 0
  const isComplete = family.total > 0 && discovered >= family.total

  return (
    <Link href={`/codex/${family.key}`} className="family-card block">
      <div
        className="relative rounded-2xl overflow-hidden p-4"
        style={{
          border: `1px solid ${family.hex}22`,
          background: `linear-gradient(135deg, ${family.hex}0F 0%, ${family.hex}06 100%)`,
        }}
      >
        {/* Watermark emoji */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[64px] select-none pointer-events-none opacity-[0.05]">
          {family.emoji}
        </span>

        <div className="flex items-center gap-3 relative z-10">
          {/* Icon box */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${family.hex}18`, border: `1px solid ${family.hex}28` }}
          >
            {family.emoji}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {family.name}
              </h3>
              <span className="text-xs tabular-nums font-medium flex-shrink-0 ml-2" style={{ color: family.hex }}>
                {discovered}/{family.total}
              </span>
            </div>
            <p className="text-[11px] text-white/30 mb-2.5 truncate" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
              {family.tagline}
            </p>
            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${pct}%`,
                  background: isComplete
                    ? `linear-gradient(90deg, ${family.hex}, #C9A84C)`
                    : `linear-gradient(90deg, ${family.hex}70, ${family.hex})`,
                }}
              />
            </div>
          </div>
        </div>

        {isComplete && (
          <span
            className="absolute top-2.5 right-10 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: '#C9A84C18', color: '#C9A84C', border: '1px solid #C9A84C35' }}
          >
            ✶ Complet
          </span>
        )}
      </div>
    </Link>
  )
}
