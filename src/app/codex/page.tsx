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

      {/* Hero */}
      <div className="px-5 pt-14 pb-8 relative overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[360px] h-[200px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 65%)',
            filter: 'blur(24px)',
          }}
        />
        <p
          className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-1"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          Codex du Valais
        </p>
        <h1
          className="text-[2.9rem] leading-none text-white mb-1"
          style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 600 }}
        >
          L'Encyclopédie
        </h1>
        <p className="text-[11px] text-white/22">
          {totalDiscovered} découvertes · {totalMemories} mémoires · {FAMILIES.length} familles
        </p>
      </div>

      {/* Global progression */}
      <div className="mx-5 mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.25em] text-white/20 mb-1"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              Rang actuel
            </p>
            <p
              className="text-base font-semibold text-white"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              {rank.title}
            </p>
            <p
              className="text-[11px] text-white/25 mt-0.5"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
            >
              {rank.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black tabular-nums shimmer-gold">
              {profile.explorerXp.toLocaleString('fr-CH')}
            </p>
            <p className="text-[10px] text-white/20 mt-0.5">XP total</p>
          </div>
        </div>
        <div className="h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #C9A84C60, #C9A84C, #E8C96A)',
              boxShadow: pct > 0 ? '0 0 14px rgba(201,168,76,0.55)' : 'none',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-white/15">{pct}% du Codex complété</span>
          <span className="text-[10px] text-white/15">{totalDiscovered}/{totalMemories}</span>
        </div>
      </div>

      {/* Family cards */}
      <div className="px-5">
        <p
          className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-4"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          Les {FAMILIES.length} Familles
        </p>
        <div className="flex flex-col gap-3">
          {FAMILIES.map((family, i) => (
            <div
              key={family.key}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
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
