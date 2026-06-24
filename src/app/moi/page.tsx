'use client'
import { BottomNav } from '@/components/layout/BottomNav'
import { useValaiaStore, useExplorerRank } from '@/store/useValaiaStore'
import { MEMORIES, getMemory } from '@/lib/data/memories'
import { FAMILIES, getFamily } from '@/lib/data/families'
import { getNextRank } from '@/lib/data/ranks'

function XPRing({ pct }: { pct: number }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = Math.min(pct / 100, 1) * circ
  return (
    <svg
      width="130" height="130" viewBox="0 0 130 130"
      className="absolute inset-0"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
      <circle
        cx="65" cy="65" r={r}
        fill="none" strokeWidth="6" strokeLinecap="round"
        stroke="url(#xpGold)"
        strokeDasharray={`${dash} ${circ - dash}`}
        style={{ filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.7))', transition: 'stroke-dasharray 1.2s ease-out' }}
      />
      <defs>
        <linearGradient id="xpGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#E8C96A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function MoiPage() {
  const { profile } = useValaiaStore()
  const rank = useExplorerRank()
  const next = getNextRank(rank)
  const totalMemories = MEMORIES.length
  const discovered = profile.discoveredIds.length
  const quizCount = profile.level2Ids.length

  const nextPct = next ? Math.min(100, (discovered / next.minDiscoveries) * 100) : 100
  const xpPct = Math.min(100, (profile.explorerXp / 50000) * 100)

  const recentIds = [...profile.discoveredIds].reverse().slice(0, 5)
  const recentMemories = recentIds.map(id => getMemory(id)).filter(Boolean) as typeof MEMORIES

  const completedFamilies = FAMILIES.filter(f =>
    MEMORIES.filter(m => m.familyKey === f.key && profile.discoveredIds.includes(m.id)).length >= f.total && f.total > 0
  )

  const joinedDate = new Date(profile.joinedAt).toLocaleDateString('fr-CH', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen pb-28 relative z-10">
      <BottomNav />

      {/* Hero */}
      <div className="relative px-5 pt-14 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', filter: 'blur(24px)' }}
          />
          <div
            className="absolute -top-24 -left-12 w-56 h-56 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(107,92,231,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }}
          />
        </div>

        <p
          className="text-[9px] uppercase tracking-[0.35em] text-white/20 mb-1"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          Profil Explorateur
        </p>
        <h1
          className="text-[2.5rem] leading-none text-white mb-8"
          style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 600 }}
        >
          Mon Atlas
        </h1>

        {/* Avatar + XP ring */}
        <div className="flex items-center gap-6">
          <div className="relative w-[130px] h-[130px] flex-shrink-0">
            <XPRing pct={xpPct} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-[78px] h-[78px] flex items-center justify-center rounded-2xl rotate-12 animate-float"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.07))',
                  border: '1.5px solid rgba(201,168,76,0.38)',
                  boxShadow: '0 0 28px -8px rgba(201,168,76,0.55)',
                }}
              >
                <span className="text-[2.2rem] -rotate-12">🏔</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Rank badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.28)' }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: '#C9A84C', fontFamily: 'var(--font-cinzel), serif' }}
              >
                ✦ {rank.title}
              </span>
            </div>
            <p
              className="text-sm text-white/32 leading-snug mb-3"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
            >
              {rank.description}
            </p>

            {/* Next rank progress */}
            {next && (
              <div>
                <div className="flex justify-between text-[9px] text-white/20 mb-1">
                  <span style={{ fontFamily: 'var(--font-cinzel), serif' }}>{next.title}</span>
                  <span>{discovered}/{next.minDiscoveries}</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${nextPct}%`,
                      background: 'linear-gradient(90deg, #C9A84C70, #C9A84C)',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-4">

        {/* Stats grid 3×2 */}
        <div className="grid grid-cols-3 gap-2 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          {[
            { value: discovered, label: 'Mémoires', icon: '📚', color: '#C9A84C' },
            { value: profile.explorerXp.toLocaleString('fr-CH'), label: 'XP', icon: '✦', color: '#E8C96A' },
            { value: quizCount, label: 'Quiz', icon: '🧠', color: '#A78BFA' },
            { value: completedFamilies.length, label: 'Complètes', icon: '🏆', color: '#FBBF24' },
            { value: totalMemories - discovered, label: 'Restantes', icon: '🔍', color: '#9CA3AF' },
            { value: FAMILIES.length, label: 'Familles', icon: '🗺', color: '#34D399' },
          ].map(s => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 text-center"
            >
              <p className="text-lg mb-0.5" style={{ color: s.color }}>{s.icon}</p>
              <p className="text-xl font-black tabular-nums text-white">{s.value}</p>
              <p
                className="text-[8px] text-white/20 uppercase tracking-widest mt-0.5"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent discoveries */}
        {recentMemories.length > 0 && (
          <div
            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 animate-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            <p
              className="text-[9px] uppercase tracking-[0.25em] text-white/20 mb-3"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              Découvertes récentes
            </p>
            <div className="flex flex-col gap-2.5">
              {recentMemories.map(m => {
                const fam = getFamily(m.familyKey)
                return (
                  <div key={m.id} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: `${fam?.hex ?? '#fff'}15`, border: `1px solid ${fam?.hex ?? '#fff'}25` }}
                    >
                      {fam?.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/75 truncate" style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '0.8rem' }}>
                        {m.name}
                      </p>
                      <p className="text-[10px] text-white/25">{fam?.name}</p>
                    </div>
                    <span className="text-[11px] font-bold tabular-nums flex-shrink-0" style={{ color: '#C9A84C' }}>
                      +{m.xpReward}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Collections */}
        <div
          className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 animate-slide-up"
          style={{ animationDelay: '0.15s' }}
        >
          <p
            className="text-[9px] uppercase tracking-[0.25em] text-white/20 mb-4"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            Collections
          </p>
          <div className="flex flex-col gap-3">
            {FAMILIES.map(f => {
              const count = MEMORIES.filter(
                m => m.familyKey === f.key && profile.discoveredIds.includes(m.id)
              ).length
              const fpct = f.total > 0 ? (count / f.total) * 100 : 0
              const isComplete = count >= f.total && f.total > 0
              return (
                <div key={f.key} className="flex items-center gap-2.5">
                  <span className="text-base flex-shrink-0 w-6 text-center">{f.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-white/35 truncate">{f.name}</span>
                      <span
                        className="text-[11px] tabular-nums flex-shrink-0 ml-2 font-semibold"
                        style={{ color: count > 0 ? f.hex : 'rgba(255,255,255,0.15)' }}
                      >
                        {count}/{f.total}{isComplete ? ' ✦' : ''}
                      </span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${fpct}%`,
                          background: isComplete ? `linear-gradient(90deg, ${f.hex}, #C9A84C)` : f.hex,
                          boxShadow: fpct > 0 ? `0 0 6px ${f.hex}60` : 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <p
          className="text-center text-[9px] text-white/10 pb-2"
          style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
        >
          Explorateur du Valais depuis le {joinedDate}
        </p>
      </div>
    </div>
  )
}
