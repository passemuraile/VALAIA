'use client'
import Link from 'next/link'
import type { Family } from '@/types/valaia'

interface Props {
  family: Family
  discovered: number
}

// Unique atmospheric scene per family
const SCENE: Record<string, string> = {
  sommets:     'linear-gradient(170deg, #030D1E 0%, #0C2340 30%, #1A4270 60%, #3A6A9A 85%, #4A7FA5 100%)',
  lacs:        'linear-gradient(180deg, #030F0D 0%, #083028 30%, #0E4A3E 60%, #1A7A6E 85%, #2A9D8F 100%)',
  bisses:      'linear-gradient(180deg, #040D12 0%, #0A2430 30%, #163850 60%, #2A6070 85%, #3D7A8A 100%)',
  gastronomie: 'linear-gradient(165deg, #160800 0%, #4A2000 30%, #8A4800 60%, #B86A10 85%, #C17F24 100%)',
  traditions:  'linear-gradient(165deg, #060010 0%, #22063A 30%, #440E70 60%, #6A1EA0 85%, #8B2FC9 100%)',
  villages:    'linear-gradient(165deg, #0C0700 0%, #2A1600 30%, #503000 60%, #7A5028 85%, #8D6E4A 100%)',
  vins:        'linear-gradient(165deg, #0A0008 0%, #200010 30%, #420018 60%, #6A1530 85%, #7B2D42 100%)',
  patrimoine:  'linear-gradient(165deg, #040800 0%, #0E1C06 30%, #203A10 60%, #3E6028 85%, #5C7A3E 100%)',
  reines:      'linear-gradient(165deg, #120500 0%, #3A1000 30%, #702200 60%, #A84010 85%, #C45C1A 100%)',
  evenements:  'linear-gradient(165deg, #140200 0%, #4A0E00 30%, #8A2000 60%, #C03800 85%, #E85D04 100%)',
  legendes:    'linear-gradient(165deg, #03000E 0%, #120640 30%, #241480 60%, #4828C0 85%, #6B5CE7 100%)',
}

// Decorative atmosphere overlay per family (glow from bottom)
const GLOW: Record<string, string> = {
  sommets:     'radial-gradient(ellipse at 50% 120%, #4A7FA580 0%, transparent 60%)',
  lacs:        'radial-gradient(ellipse at 50% 120%, #2A9D8F70 0%, transparent 60%)',
  bisses:      'radial-gradient(ellipse at 50% 120%, #3D7A8A70 0%, transparent 60%)',
  gastronomie: 'radial-gradient(ellipse at 50% 120%, #C17F2470 0%, transparent 60%)',
  traditions:  'radial-gradient(ellipse at 50% 120%, #8B2FC970 0%, transparent 60%)',
  villages:    'radial-gradient(ellipse at 50% 120%, #8D6E4A60 0%, transparent 60%)',
  vins:        'radial-gradient(ellipse at 50% 120%, #7B2D4270 0%, transparent 60%)',
  patrimoine:  'radial-gradient(ellipse at 50% 120%, #5C7A3E60 0%, transparent 60%)',
  reines:      'radial-gradient(ellipse at 50% 120%, #C45C1A60 0%, transparent 60%)',
  evenements:  'radial-gradient(ellipse at 50% 120%, #E85D0460 0%, transparent 60%)',
  legendes:    'radial-gradient(ellipse at 50% 120%, #6B5CE780 0%, transparent 60%)',
}

export function FamilyCard({ family, discovered }: Props) {
  const pct = family.total > 0 ? (discovered / family.total) * 100 : 0
  const isComplete = family.total > 0 && discovered >= family.total
  const remaining = family.total - discovered
  const scene = SCENE[family.key] ?? `linear-gradient(180deg, #0A0C16 0%, ${family.hex}30 100%)`
  const glow = GLOW[family.key] ?? `radial-gradient(ellipse at 50% 120%, ${family.hex}60 0%, transparent 60%)`

  return (
    <Link href={`/codex/${family.key}`} className="block group select-none">
      <div
        className="rounded-3xl overflow-hidden transition-all duration-300 group-hover:scale-[1.015] group-active:scale-[0.99]"
        style={{
          border: `1px solid ${family.hex}32`,
          boxShadow: `0 8px 32px -10px ${family.hex}60, inset 0 1px 0 ${family.hex}20`,
        }}
      >

        {/* ── SCENE / COVER ── */}
        <div className="relative overflow-hidden" style={{ height: '148px' }}>
          {/* Atmospheric gradient */}
          <div className="absolute inset-0" style={{ background: scene }} />

          {/* Bottom atmospheric glow */}
          <div className="absolute inset-0" style={{ background: glow }} />

          {/* Stars / particles for legendes */}
          {family.key === 'legendes' && (
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
          )}

          {/* Top shimmer */}
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${family.hex}90, transparent)` }}
          />

          {/* Complete badge */}
          {isComplete && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className="text-[9px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}
              >
                ✦ Complète
              </span>
            </div>
          )}

          {/* Big centered emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="transition-transform duration-500 group-hover:scale-125"
              style={{
                fontSize: '72px',
                lineHeight: 1,
                filter: `drop-shadow(0 0 20px ${family.hex}C0) drop-shadow(0 0 40px ${family.hex}60)`,
              }}
            >
              {family.emoji}
            </span>
          </div>

          {/* Tagline overlay at bottom */}
          <div
            className="absolute bottom-0 inset-x-0 px-4 pt-6 pb-3"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
          >
            <p
              className="text-[11px] text-white/55 leading-snug"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
            >
              {family.tagline}
            </p>
          </div>
        </div>

        {/* ── INFO PANEL ── */}
        <div
          className="px-4 pt-3.5 pb-4"
          style={{
            background: `linear-gradient(180deg, ${family.hex}18 0%, #080A14 100%)`,
          }}
        >
          {/* Name + count */}
          <div className="flex items-center justify-between mb-2.5">
            <h3
              className="text-[1.05rem] font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              {family.name}
            </h3>
            <div
              className="flex items-center gap-0.5 px-2.5 py-1 rounded-xl flex-shrink-0 ml-2"
              style={{ background: `${family.hex}18`, border: `1px solid ${family.hex}28` }}
            >
              <span
                className="text-[1.1rem] font-black tabular-nums leading-none"
                style={{ color: family.hex }}
              >
                {discovered}
              </span>
              <span className="text-[11px] text-white/25 leading-none">/{family.total}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-[5px] rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${pct}%`,
                background: isComplete
                  ? `linear-gradient(90deg, ${family.hex}, #E8C96A)`
                  : `linear-gradient(90deg, ${family.hex}80, ${family.hex})`,
                boxShadow: pct > 2 ? `0 0 10px ${family.hex}90` : 'none',
              }}
            />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/20">
              {isComplete ? 'Collection terminée' : `${remaining} ${remaining === 1 ? 'mémoire restante' : 'mémoires restantes'}`}
            </span>
            <div
              className="text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all duration-200 group-hover:scale-105"
              style={{
                background: `${family.hex}1A`,
                color: family.hex,
                border: `1px solid ${family.hex}30`,
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
