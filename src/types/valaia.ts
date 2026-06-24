export type FamilyKey =
  | 'natura' | 'terroir' | 'patrimoine' | 'traditions' | 'legendes'
  | 'sommets' | 'lacs' | 'bisses' | 'gastronomie' | 'villages'
  | 'vins' | 'reines' | 'evenements'

export type MemoryRarity = 'commun' | 'rare' | 'epique' | 'legendaire' | 'mythique'

export type DiscoveryMode = 'gps' | 'qr' | 'photo' | 'quiz' | 'event'

export interface Family {
  key: FamilyKey
  name: string
  emoji: string
  hex: string
  hexDark?: string
  bgClass: string
  borderClass: string
  textClass: string
  glowClass: string
  description: string
  tagline: string
  total: number
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
}

export interface Memory {
  id: string
  familyKey: FamilyKey
  index: number
  name: string
  subtitle: string
  rarity: MemoryRarity
  discoveryModes: DiscoveryMode[]
  district: string
  location: string
  coordinates?: { lat: number; lng: number }
  excerpt: string
  story: string
  secretLore?: string
  hint: string
  quiz?: QuizQuestion[]
  tags: string[]
  relatedIds?: string[]
  seasonalOnly?: { months: number[]; label: string }
  xpReward: number
}

export interface ExplorerRank {
  key: string
  title: string
  minDiscoveries: number
  description: string
}

export interface ExplorerProfile {
  discoveredIds: string[]
  level2Ids: string[]
  explorerXp: number
  joinedAt: string
}
