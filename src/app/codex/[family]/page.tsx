'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getFamily } from '@/lib/data/families'
import { MEMORIES } from '@/lib/data/memories'
import { useValaiaStore } from '@/store/useValaiaStore'
import { MemoryCard } from '@/components/codex/MemoryCard'
import { BottomNav } from '@/components/layout/BottomNav'
import type { FamilyKey } from '@/types/valaia'

export default function FamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const { family: familyKey } = use(params)
  const family = getFamily(familyKey)
  if (!family) notFound()

  const { profile } = useValaiaStore()
  const memories = MEMORIES.filter(m => m.familyKey === (familyKey as FamilyKey))
  const discoveredCount = memories.filter(m => profile.discoveredIds.includes(m.id)).length
  const total = memories.length || family.total
  const pct = total > 0 ? Math.round((discoveredCount / total) * 100) : 0
  const isComplete = discoveredCount >= total && total > 0

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <BottomNav />

      {/* Hero header */}
      <div
        className="relative px-5 pt-14 pb-8 overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${family.hex}22 0%, transparent 100%)` }}
      >
        {/* Color glow */}
        <div
          className="absolute top-0 left-0 right-0 h-44 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% -10%, ${family.hex}55 0%, transparent 65%)`,
            filter: 'blur(1px)',
          }}
        />

        <Link
          href="/codex"
          className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors mb-6 relative z-10"
        >
          <ArrowLeft size={14} />
          Codex
        </Link>

        <div className="flex items-start gap-4 relative z-10">
          <div
            className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${family.hex}30, ${family.hex}12)`,
              border: `1.5px solid ${family.hex}50`,
              boxShadow: `0 8px 28px -8px ${family.hex}90`,
            }}
          >
            {family.emoji}
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.3em] text-white/25 mb-0.5"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              Collection
            </p>
            <h1
              className="text-[2rem] font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              {family.name}
            </h1>
            <p
              className="text-sm mt-1"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: family.hex }}
            >
              {family.tagline}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-white/25">
              {discoveredCount}/{total} découvertes
            </span>
            <div className="flex items-center gap-2">
              {isComplete && (
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#C9A84C18', color: '#C9A84C', border: '1px solid #C9A84C35' }}
                >
                  ✦ Complète
                </span>
              )}
              <span className="text-[10px] text-white/25">{pct}%</span>
            </div>
          </div>
          <div className="h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: isComplete
                  ? `linear-gradient(90deg, ${family.hex}, #E8C96A)`
                  : `linear-gradient(90deg, ${family.hex}85, ${family.hex})`,
                boxShadow: pct > 5 ? `0 0 10px ${family.hex}90` : 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mb-6">
        <p
          className="text-white/32 leading-relaxed"
          style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.05rem' }}
        >
          {family.description}
        </p>
      </div>

      {/* Gallery */}
      <div className="px-4">
        <p
          className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-4 px-1"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          {memories.length > 0 ? `${memories.length} mémoires` : 'Mémoires à venir'}
        </p>

        {memories.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-12 text-center">
            <p className="text-5xl mb-4 opacity-20">{family.emoji}</p>
            <p
              className="text-sm text-white/25"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
            >
              Les mémoires de cette famille arrivent bientôt…
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {memories.map((m, i) => (
              <div
                key={m.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 0.045}s` }}
              >
                <MemoryCard
                  memory={m}
                  family={family}
                  discovered={profile.discoveredIds.includes(m.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
