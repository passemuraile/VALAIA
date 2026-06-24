'use client'
import { BottomNav } from '@/components/layout/BottomNav'
import { useValaiaStore, useExplorerRank } from '@/store/useValaiaStore'
import { MEMORIES } from '@/lib/data/memories'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { getNextRank } from '@/lib/data/ranks'

export default function MoiPage() {
  const { profile } = useValaiaStore()
  const rank = useExplorerRank()
  const next = getNextRank(rank)
  const total = MEMORIES.length
  const discovered = profile.discoveredIds.length

  return (
    <div className="min-h-screen pb-24 relative z-10 max-w-lg mx-auto px-4 pt-14">
      <BottomNav />
      <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Ton profil</p>
      <h1 className="text-3xl font-black mb-8">L\'Explorateur</h1>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 flex flex-col gap-4">
        <div className="text-center">
          <div className="text-5xl mb-3">🏔</div>
          <h2 className="text-xl font-bold">{rank.title}</h2>
          <p className="text-sm text-white/40 mt-1">{rank.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-white/[0.04] p-3">
            <p className="text-2xl font-black">{discovered}</p>
            <p className="text-[10px] text-white/30 mt-0.5">Mémoires</p>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-3">
            <p className="text-2xl font-black">{profile.explorerXp.toLocaleString(\'fr-CH\')}</p>
            <p className="text-[10px] text-white/30 mt-0.5">XP total</p>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-3">
            <p className="text-2xl font-black">{profile.level2Ids.length}</p>
            <p className="text-[10px] text-white/30 mt-0.5">Quiz réussis</p>
          </div>
        </div>

        {next && (
          <div>
            <div className="flex justify-between text-[11px] text-white/30 mb-1.5">
              <span>Vers : {next.title}</span>
              <span>{discovered}/{next.minDiscoveries}</span>
            </div>
            <ProgressBar value={discovered} max={next.minDiscoveries} />
          </div>
        )}
      </div>
    </div>
  )
}
