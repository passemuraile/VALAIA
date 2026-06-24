'use client'
import { FAMILIES } from '@/lib/data/families'
import { MEMORIES } from '@/lib/data/memories'
import { useValaiaStore, useExplorerRank } from '@/store/useValaiaStore'
import { FamilyCard } from '@/components/codex/FamilyCard'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function CodexPage() {
  const { profile } = useValaiaStore()
  const rank = useExplorerRank()
  const totalMemories = MEMORIES.length
  const totalDiscovered = profile.discoveredIds.length

  const discoveredByFamily = Object.fromEntries(
    FAMILIES.map(f => [
      f.key,
      MEMORIES.filter(m => m.familyKey === f.key && profile.discoveredIds.includes(m.id)).length,
    ])
  )

  return (
    <main className="px-4 pt-14 pb-6 max-w-lg mx-auto">
      <div className="mb-8 animate-fade-in">
        <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Ton codex</p>
        <h1 className="text-3xl font-black tracking-tight">LE CODEX</h1>
        <p className="text-sm text-white/40 mt-1">L\'atlas vivant de ta découverte du Valais</p>
      </div>

      <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-0.5">Rang actuel</p>
            <p className="text-lg font-bold text-white">{rank.title}</p>
            <p className="text-xs text-white/40 mt-0.5">{rank.description}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black tabular-nums text-white">{totalDiscovered}</span>
            <span className="text-white/25 text-sm">/{totalMemories}</span>
            <p className="text-[10px] text-white/30 mt-0.5">mémoires</p>
          </div>
        </div>
        <ProgressBar value={totalDiscovered} max={totalMemories} />
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-white/25">{Math.round((totalDiscovered / totalMemories) * 100)}% de l\'atlas</span>
          <span className="text-[10px] text-white/25">{profile.explorerXp.toLocaleString(\'fr-CH\')} XP</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 animate-slide-up" style={{ animationDelay: \'0.1s\' }}>
        <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Les 5 familles</p>
        {FAMILIES.map(family => (
          <FamilyCard
            key={family.key}
            family={family}
            discovered={discoveredByFamily[family.key] ?? 0}
          />
        ))}
      </div>
    </main>
  )
}
