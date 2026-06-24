'use client'
import { BottomNav } from '@/components/layout/BottomNav'
import { useValaiaStore, useExplorerRank } from '@/store/useValaiaStore'
import { MEMORIES } from '@/lib/data/memories'
import { FAMILIES } from '@/lib/data/families'
import { getNextRank } from '@/lib/data/ranks'

export default function MoiPage() {
  const { profile } = useValaiaStore()
  const rank = useExplorerRank()
  const next = getNextRank(rank)
  const total = MEMORIES.length
  const discovered = profile.discoveredIds.length

  const joinedDate = new Date(profile.joinedAt).toLocaleDateString('fr-CH', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <BottomNav />

      {/* Header */}
      <div className="px-5 pt-14 pb-6 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: '#C9A84C' }}
        />
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-1" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          Ton profil
        </p>
        <h1 className="text-[2.6rem] leading-none text-white" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 600 }}>
          Explorateur
        </h1>
      </div>

      <div className="px-5 flex flex-col gap-4">

        {/* Avatar + Rank */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 animate-slide-up">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-2xl rotate-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.08))',
                  border: '1px solid rgba(201,168,76,0.3)',
                }}
              />
              <span className="text-4xl relative z-10 animate-float">🏔</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {rank.title}
              </h2>
              <p className="text-sm text-white/30 mt-1" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
                {rank.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2.5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          {[
            { value: discovered, label: 'Mémoires', icon: '📚' },
            { value: profile.explorerXp.toLocaleString('fr-CH'), label: 'XP total', icon: '✶' },
            { value: profile.level2Ids.length, label: 'Quiz réussis', icon: '🧠' },
          ].map(s => (
            <div
              key={s.label}
              className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center"
            >
              <p className="text-base mb-1 leading-none">{s.icon}</p>
              <p className="text-xl font-bold tabular-nums text-white">{s.value}</p>
              <p className="text-[9px] text-white/25 uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Next rank progress */}
        {next && (
          <div
            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 animate-slide-up"
            style={{ animationDelay: '0.08s' }}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
                Prochain rang
              </p>
              <p className="text-xs text-white/30 tabular-nums">{discovered}/{next.minDiscoveries}</p>
            </div>
            <p className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              {next.title}
            </p>
            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, (discovered / next.minDiscoveries) * 100)}%`,
                  background: 'linear-gradient(90deg, #C9A84C70, #C9A84C)',
                }}
              />
            </div>
          </div>
        )}

        {/* Collections par famille */}
        <div
          className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 animate-slide-up"
          style={{ animationDelay: '0.12s' }}
        >
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/20 mb-4" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
            Collections
          </p>
          <div className="flex flex-col gap-3">
            {FAMILIES.map(f => {
              const count = MEMORIES.filter(
                m => m.familyKey === f.key && profile.discoveredIds.includes(m.id)
              ).length
              const fpct = f.total > 0 ? (count / f.total) * 100 : 0
              return (
                <div key={f.key} className="flex items-center gap-2.5">
                  <span className="text-base flex-shrink-0 w-6 text-center">{f.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-white/35 truncate">{f.name}</span>
                      <span className="text-[11px] tabular-nums flex-shrink-0 ml-2" style={{ color: count > 0 ? f.hex : 'rgba(255,255,255,0.2)' }}>
                        {count}/{f.total}
                      </span>
                    </div>
                    <div className="h-0.5 rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${fpct}%`, background: f.hex }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <p className="text-center text-[9px] text-white/10 pb-2">
          Explorateur depuis le {joinedDate}
        </p>
      </div>
    </div>
  )
}
