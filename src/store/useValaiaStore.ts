'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ExplorerProfile } from '@/types/valaia'
import { getRankFromDiscoveries } from '@/lib/data/ranks'

interface ValaiaStore {
  profile: ExplorerProfile
  discoverMemory: (id: string, xpReward: number) => void
  completeQuiz: (id: string) => void
  isDiscovered: (id: string) => boolean
  hasQuizCompleted: (id: string) => boolean
  getDiscoveredCount: () => number
}

const defaultProfile: ExplorerProfile = {
  discoveredIds: [],
  level2Ids: [],
  explorerXp: 0,
  joinedAt: new Date().toISOString(),
}

export const useValaiaStore = create<ValaiaStore>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,

      discoverMemory: (id, xpReward) => {
        const { profile } = get()
        if (profile.discoveredIds.includes(id)) return
        set({
          profile: {
            ...profile,
            discoveredIds: [...profile.discoveredIds, id],
            explorerXp: profile.explorerXp + xpReward,
          },
        })
      },

      completeQuiz: (id) => {
        const { profile } = get()
        if (profile.level2Ids.includes(id)) return
        set({
          profile: {
            ...profile,
            level2Ids: [...profile.level2Ids, id],
            explorerXp: profile.explorerXp + 50,
          },
        })
      },

      isDiscovered: (id) => get().profile.discoveredIds.includes(id),

      hasQuizCompleted: (id) => get().profile.level2Ids.includes(id),

      getDiscoveredCount: () => get().profile.discoveredIds.length,
    }),
    { name: 'valaia-explorer' }
  )
)

export function useExplorerRank() {
  const count = useValaiaStore(s => s.getDiscoveredCount())
  return getRankFromDiscoveries(count)
}
