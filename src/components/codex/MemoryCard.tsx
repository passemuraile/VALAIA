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
    <Link href={`/codex/memory/${memory.id}`} className="block group select-none">
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.04] group-active:scale-[0.97]"
        style={{
          border: discovered ? `1px solid ${family.hex}38` : '1px solid rgba(255,255,255,0.07)',
          background: discovered
            ? `linear-gradient(160deg, ${family.hex}1E 0%, ${family.hex}0A 55%, #090B14 100%)`
            : 'linear-gradient(160deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)',
          boxShadow: discovered ? `0 6px 24px -8px ${family.hex}65` : '0 2px 8px rgba(0,0,0,0.4)',
          aspectRatio: '3/4.2',
        }}
      >
        {/* Top shimmer */}
        {discovered && (
          <div
            className="absolute top-0 left-4 right-4 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${family.hex}80, transparent)` }}
          />
        )}

        {/* Big watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ fontSize: '72px', opacity: discovered ? 0.09 : 0.035 }}
        >
          {discovered ? family.emoji : '?'}
        </div>

        {/* Undiscovered silhouette */}
        {!discovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
            <div className="text-2xl opacity-15">🔒</div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          {/* Top: index + rarity */}
          <div className="flex items-start justify-between gap-1">
            <span
              className="text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-lg"
              style={{
                background: discovered ? `${family.hex}28` : 'rgba(255,255,255,0.06)',
                color: discovered ? family.hex : 'rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-cinzel), serif',
                border: discovered ? `1px solid ${family.hex}30` : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              #{String(memory.index).padStart(2, '0')}
            </span>
            {discovered && <RarityBadge rarity={memory.rarity} />}
          </div>

          {/* Bottom: info */}
          <div>
            {discovered ? (
              <>
                <p
                  className="text-[11px] font-bold text-white leading-tight mb-0.5"
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                >
                  {memory.name}
                </p>
                <p
                  className="text-[10px] text-white/35 truncate mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
                >
                  {memory.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-white/25 truncate">{memory.district}</span>
                  <span
                    className="text-[10px] font-black tabular-nums"
                    style={{ color: '#C9A84C' }}
                  >
                    +{memory.xpReward}
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="h-1.5 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.04)' }} />
                <div className="h-1.5 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.03)' }} />
              </div>
            )}
          </div>
        </div>

        {/* Shine effect on hover (discovered only) */}
        {discovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${family.hex}12 0%, transparent 50%, ${family.hex}08 100%)`,
            }}
          />
        )}
      </div>
    </Link>
  )
}
