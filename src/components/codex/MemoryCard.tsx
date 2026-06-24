'use client'
import Link from 'next/link'
import type { Memory, Family } from '@/types/valaia'
import { RarityBadge } from '@/components/ui/RarityBadge'

interface Props {
  memory: Memory
  family: Family
  discovered: boolean
}

// Unique deep scene gradient per family
const SCENE: Record<string, string> = {
  sommets:     'linear-gradient(170deg, #030D1E 0%, #0C2340 35%, #1A4270 65%, #3A6A9A 100%)',
  lacs:        'linear-gradient(180deg, #030F0D 0%, #083028 35%, #0E4A3E 65%, #1A7A6E 100%)',
  bisses:      'linear-gradient(180deg, #040D12 0%, #0A2430 35%, #163850 65%, #2A6070 100%)',
  gastronomie: 'linear-gradient(165deg, #160800 0%, #4A2000 35%, #8A4800 65%, #B86A10 100%)',
  traditions:  'linear-gradient(165deg, #060010 0%, #22063A 35%, #440E70 65%, #6A1EA0 100%)',
  villages:    'linear-gradient(165deg, #0C0700 0%, #2A1600 35%, #503000 65%, #7A5028 100%)',
  vins:        'linear-gradient(165deg, #0A0008 0%, #200010 35%, #420018 65%, #6A1530 100%)',
  patrimoine:  'linear-gradient(165deg, #040800 0%, #0E1C06 35%, #203A10 65%, #3E6028 100%)',
  reines:      'linear-gradient(165deg, #120500 0%, #3A1000 35%, #702200 65%, #A84010 100%)',
  evenements:  'linear-gradient(165deg, #140200 0%, #4A0E00 35%, #8A2000 65%, #C03800 100%)',
  legendes:    'linear-gradient(165deg, #03000E 0%, #120640 35%, #241480 65%, #4828C0 100%)',
}

export function MemoryCard({ memory, family, discovered }: Props) {
  const scene = SCENE[family.key] ?? `linear-gradient(180deg, #0A0C16 0%, ${family.hex}40 100%)`

  return (
    <Link href={`/codex/memory/${memory.id}`} className="block group select-none">
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.04] group-active:scale-[0.96]"
        style={{
          border: discovered ? `1px solid ${family.hex}42` : '1px solid rgba(255,255,255,0.07)',
          boxShadow: discovered
            ? `0 8px 28px -8px ${family.hex}70`
            : '0 2px 10px rgba(0,0,0,0.6)',
        }}
      >

        {/* ── ILLUSTRATION / SCENE ── */}
        <div className="relative overflow-hidden" style={{ height: '124px' }}>
          {/* Scene background */}
          <div className="absolute inset-0" style={{ background: scene }} />

          {/* Bottom atmospheric glow */}
          <div
            className="absolute inset-x-0 bottom-0 h-20"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${family.hex}55 0%, transparent 65%)`,
            }}
          />

          {/* Stars for legendes */}
          {family.key === 'legendes' && (
            <div className="absolute inset-0 opacity-25" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }} />
          )}

          {/* Top shimmer */}
          {discovered && (
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${family.hex}90, transparent)` }}
            />
          )}

          {/* Emoji centerpiece */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-400 group-hover:scale-110"
            style={{
              fontSize: '52px',
              lineHeight: 1,
              opacity: discovered ? 1 : 0.06,
              filter: discovered ? `drop-shadow(0 0 14px ${family.hex}C0)` : 'none',
            }}
          >
            {discovered ? family.emoji : '?'}
          </div>

          {/* Index badge — top left */}
          <div
            className="absolute top-2 left-2 text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-lg"
            style={{
              background: 'rgba(0,0,0,0.55)',
              color: discovered ? family.hex : 'rgba(255,255,255,0.18)',
              fontFamily: 'var(--font-cinzel), serif',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${discovered ? family.hex + '30' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            #{String(memory.index).padStart(2, '0')}
          </div>

          {/* Rarity badge — top right (discovered only) */}
          {discovered && (
            <div className="absolute top-2 right-2">
              <RarityBadge rarity={memory.rarity} />
            </div>
          )}

          {/* Lock overlay */}
          {!discovered && (
            <div className="absolute inset-0 bg-black/72 flex flex-col items-center justify-center gap-1.5">
              <span className="text-xl opacity-20">🔒</span>
              <p
                className="text-[8px] uppercase tracking-[0.25em] text-white/15"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                Inconnue
              </p>
            </div>
          )}

          {/* Hover shine (discovered) */}
          {discovered && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${family.hex}18 0%, transparent 45%, ${family.hex}10 100%)`,
              }}
            />
          )}
        </div>

        {/* ── INFO PANEL ── */}
        <div
          style={{
            background: discovered
              ? `linear-gradient(180deg, ${family.hex}14 0%, #070910 100%)`
              : 'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, #060810 100%)',
            padding: '10px 12px 11px',
          }}
        >
          {discovered ? (
            <>
              <p
                className="text-[11px] font-bold text-white leading-tight mb-0.5 truncate"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                {memory.name}
              </p>
              <p
                className="text-[10px] text-white/32 truncate mb-2"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
              >
                {memory.subtitle}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/22 truncate">{memory.district}</span>
                <span
                  className="text-[10px] font-black tabular-nums flex-shrink-0 ml-1"
                  style={{ color: '#C9A84C' }}
                >
                  +{memory.xpReward}
                </span>
              </div>
            </>
          ) : (
            <div className="space-y-1.5 py-0.5">
              <div className="h-[7px] rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="h-[5px] rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="flex justify-between mt-1">
                <div className="h-[5px] rounded-full w-1/3" style={{ background: 'rgba(255,255,255,0.03)' }} />
                <div className="h-[5px] rounded-full w-1/5" style={{ background: 'rgba(255,255,255,0.03)' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
