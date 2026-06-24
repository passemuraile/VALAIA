'use client'
import { FAMILIES } from '@/lib/data/families'
import { MEMORIES } from '@/lib/data/memories'
import { useValaiaStore, useExplorerRank } from '@/store/useValaiaStore'
import { FamilyCard } from '@/components/codex/FamilyCard'
import { BottomNav } from '@/components/layout/BottomNav'

export default function CodexPage() {
  const { profile } = useValaiaStore()
  const rank = useExplorerRank()
  const totalMemories = MEMORIES.length
  const totalDiscovered = profile.discoveredIds.length
  const pct = totalMemories > 0 ? Math.round((totalDiscovered / totalMemories) * 100) : 0

  const discoveredByFamily = Object.fromEntries(
    FAMILIES.map(f => [
      f.key,
      MEMORIES.filter(m => m.familyKey === f.key && profile.discoveredIds.includes(m.id)).length,
    ])
  )

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <BottomNav />

      {/* Header */}
      <div className="px-5 pt-14 pb-6 relative overflow-hidden">
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
        />
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-1" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          Codex du Valais
        </p>
        <h1 className="text-[2.6rem] leading-none mb-1 text-white" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 600 }}>
          L’Encyclopédie
        </h1>
        <p className="text-[11px] text-white/25">
          {totalDiscovered} mémoires découvertes · {totalMemories} au total
        </p>
      </div>

      {/* XP + Progression card */}
      <div className="mx-5 mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/20 mb-1" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              Rang actuel
            </p>
            <p className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              {rank.title}
            </p>
            <p className="text-[11px] text-white/30 mt-0.5">{rank.description}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums shimmer-gold">
              {profile.explorerXp.toLocaleString('fr-CH')}
            </p>
            <p className="text-[10px] text-white/20 mt-0.5">XP total</p>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #C9A84C60, #C9A84C, #E8C96A)',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-white/15">{pct}% du Codex complété</span>
          <span className="text-[10px] text-white/15">{totalDiscovered}/{totalMemories}</span>
        </div>
      </div>

      {/* Families list */}
      <div className="px-5">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-4" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          Les 11 Familles
        </p>
        <div className="flex flex-col gap-2.5">
          {FAMILIES.map((family, i) => (
            <div key={family.key} className="animate-slide-up" style={{ animationDelay: `${i * 0.035}s` }}>
              <FamilyCard
                family={family}
                discovered={discoveredByFamily[family.key] ?? 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
