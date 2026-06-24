'use client'
import Link from 'next/link'
import type { Family } from '@/types/valaia'

interface Props {
  family: Family
  discovered: number
}

const FAMILY_OVERLAY: Record<string, string> = {
  sommets:     'radial-gradient(ellipse at 85% 20%, #4A7FA540 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, #1A3A5C28 0%, transparent 45%)',
  lacs:        'radial-gradient(ellipse at 70% 30%, #2A9D8F35 0%, transparent 55%), linear-gradient(180deg, #0D4A4418 0%, transparent 50%)',
  bisses:      'radial-gradient(ellipse at 65% 35%, #3D7A8A32 0%, transparent 55%)',
  gastronomie: 'radial-gradient(ellipse at 75% 25%, #C17F2432 0%, transparent 55%)',
  traditions:  'radial-gradient(ellipse at 80% 20%, #8B2FC932 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, #3A0D5C20 0%, transparent 45%)',
  villages:    'radial-gradient(ellipse at 70% 40%, #8D6E4A28 0%, transparent 55%)',
  vins:        'radial-gradient(ellipse at 80% 25%, #7B2D4232 0%, transparent 55%)',
  patrimoine:  'radial-gradient(ellipse at 75% 25%, #5C7A3E28 0%, transparent 55%)',
  reines:      'radial-gradient(ellipse at 80% 20%, #C45C1A28 0%, transparent 55%)',
  evenements:  'radial-gradient(ellipse at 75% 20%, #E85D0430 0%, transparent 55%)',
  legendes:    'radial-gradient(ellipse at 80% 30%, #6B5CE732 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, #2D1B8C20 0%, transparent 45%)',
}

export function FamilyCard({ family, discovered }: Props) {
  const pct = family.total > 0 ? (discovered / family.total) * 100 : 0
  const isComplete = family.total > 0 && discovered >= family.total
  const remaining = family.total - discovered

  return (
    <Link href={`/codex/${family.key}`} className="block group select-none">
      <div
        className="relative rounded-3xl overflow-hidden transition-all duration-300 group-hover:scale-[1.015] group-active:scale-[0.99]"
        style={{
          background: `linear-gradient(145deg, ${family.hex}1C 0%, ${family.hexDark ?? family.hex}0E 65%, #090B14 100%)`,
          border: `1px solid ${family.hex}32`,
          boxShadow: `0 6px 28px -10px ${family.hex}55, inset 0 1px 0 ${family.hex}1E`,
          minHeight: '195px',
        }}
      >
        {/* Family-specific overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: FAMILY_OVERLAY[family.key] ?? '' }}
        />

        {/* Top shimmer */}
        <div
          className="absolute top-0 left-10 right-10 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${family.hex}75, transparent)` }}
        />

        {/* Giant emoji watermark */}
        <div
          className="absolute -right-5 top-1/2 -translate-y-1/2 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ fontSize: '155px', lineHeight: 1, opacity: 0.055 }}
        >
          {family.emoji}
        </div>

        <div className="relative z-10 p-5 flex flex-col" style={{ minHeight: '195px' }}>

          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${family.hex}2C, ${family.hex}10)`,
                border: `1.5px solid ${family.hex}48`,
                boxShadow: `0 4px 16px -6px ${family.hex}80`,
              }}
            >
              {family.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-[9px] uppercase tracking-[0.4em] mb-0.5 font-semibold"
                style={{ color: `${family.hex}AA`, fontFamily: 'var(--font-cinzel), serif' }}
              >
                Collection
              </p>
              <h3
                className="text-[1.3rem] font-bold text-white leading-tight"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                {family.name}
              </h3>
            </div>

            {/* Counter badge */}
            <div
              className="flex flex-col items-center justify-center w-[54px] h-[54px] rounded-2xl flex-shrink-0"
              style={{ background: `${family.hex}14`, border: `1px solid ${family.hex}28` }}
            >
              <span
                className="text-[1.4rem] font-black tabular-nums leading-none"
                style={{ color: family.hex }}
              >
                {discovered}
              </span>
              <div className="w-6 h-px my-[3px]" style={{ background: `${family.hex}45` }} />
              <span className="text-[10px] text-white/25 leading-none">{family.total}</span>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="text-white/38 mb-4 leading-snug flex-1"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontSize: '1rem' }}
          >
            {family.tagline}
          </p>

          {/* Progress bar */}
          <div className="mb-3.5">
            <div className="h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${pct}%`,
                  background: isComplete
                    ? `linear-gradient(90deg, ${family.hex}, #E8C96A)`
                    : `linear-gradient(90deg, ${family.hex}85, ${family.hex})`,
                  boxShadow: pct > 2 ? `0 0 10px ${family.hex}90` : 'none',
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {isComplete ? (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#C9A84C18', color: '#C9A84C', border: '1px solid #C9A84C40' }}
              >
                ✦ Collection complète
              </span>
            ) : (
              <span className="text-[10px] text-white/20">
                {remaining} {remaining === 1 ? 'mémoire restante' : 'mémoires restantes'}
              </span>
            )}

            <div
              className="text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200 group-hover:scale-105"
              style={{
                background: `${family.hex}18`,
                color: family.hex,
                border: `1px solid ${family.hex}32`,
              }}
            >
              Explorer →
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
