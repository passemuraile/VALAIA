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
  const discovered = memories.filter(m => profile.discoveredIds.includes(m.id))
  const pct = family.total > 0 ? Math.round((discovered.length / family.total) * 100) : 0

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <BottomNav />

      {/* Header with family color glow */}
      <div
        className="relative px-5 pt-14 pb-8 overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${family.hex}18 0%, transparent 100%)` }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-32 blur-3xl opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${family.hex} 0%, transparent 70%)` }}
        />

        <Link
          href="/codex"
          className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Codex
        </Link>

        <div className="flex items-start gap-4 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: `${family.hex}20`, border: `1px solid ${family.hex}35` }}
          >
            {family.emoji}
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25 mb-0.5" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              Famille
            </p>
            <h1 className="text-3xl font-semibold text-white leading-tight" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              {family.name}
            </h1>
            <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: family.hex }}>
              {family.tagline}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 relative z-10">
          <div className="flex justify-between text-[10px] text-white/25 mb-1.5">
            <span>{discovered.length}/{family.total} découvertes</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${family.hex}80, ${family.hex})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 mb-5">
        <p className="text-sm text-white/35 leading-relaxed" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}>
          {family.description}
        </p>
      </div>

      {/* Memories list */}
      <div className="px-5">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-3" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          {memories.length > 0 ? `${memories.length} mémoires` : 'Mémoires à venir'}
        </p>

        {memories.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 text-center">
            <p className="text-3xl mb-3">{family.emoji}</p>
            <p className="text-sm text-white/30" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
              Les mémoires de cette famille arrivent bientôt...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {memories.map((m, i) => (
              <div key={m.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.03}s` }}>
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
