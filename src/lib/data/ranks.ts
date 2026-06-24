import type { ExplorerRank } from '@/types/valaia'

export const RANKS: ExplorerRank[] = [
  { key: 'visiteur',        title: 'Visiteur de passage',     minDiscoveries: 0,    description: 'Le Valais te découvre.' },
  { key: 'curieux',         title: 'Curieux des chemins',     minDiscoveries: 5,    description: 'Tu commences à regarder autour de toi.' },
  { key: 'randonneur',      title: 'Randonneur Valaisan',     minDiscoveries: 15,   description: 'Les sentiers n\'ont plus de secrets pour toi.' },
  { key: 'connaisseur',     title: 'Connaisseur des Alpes',   minDiscoveries: 30,   description: 'Tu lis le territoire comme un livre.' },
  { key: 'gardien_bisses',  title: 'Gardien des Bisses',      minDiscoveries: 50,   description: 'Tu portes l\'eau des anciens.' },
  { key: 'fils_rhone',      title: 'Fils du Rhône',           minDiscoveries: 80,   description: 'Le fleuve coule dans tes veines.' },
  { key: 'eclaireur',       title: 'Éclaireur des Sommets',   minDiscoveries: 120,  description: 'Tu vois ce que les autres ne voient pas.' },
  { key: 'memoire_terroir', title: 'Mémoire du Terroir',      minDiscoveries: 180,  description: 'Chaque goût te raconte une histoire.' },
  { key: 'sage_traditions', title: 'Sage des Traditions',     minDiscoveries: 250,  description: 'Tu transmets ce que les anciens t\'ont confié.' },
  { key: 'legende_vivante', title: 'Légende Vivante',         minDiscoveries: 350,  description: 'On raconte ton nom dans les vallées.' },
  { key: 'ame_valais',      title: 'Âme du Valais',           minDiscoveries: 450,  description: 'Le Valais et toi ne faites plus qu\'un.' },
  { key: 'gardien_memoire', title: 'Gardien de la Mémoire',   minDiscoveries: 500,  description: 'Tu es la mémoire vivante de ce territoire.' },
]

export function getRankFromDiscoveries(count: number): ExplorerRank {
  const sorted = [...RANKS].sort((a, b) => b.minDiscoveries - a.minDiscoveries)
  return sorted.find(r => count >= r.minDiscoveries) ?? RANKS[0]
}

export function getNextRank(current: ExplorerRank): ExplorerRank | null {
  const idx = RANKS.findIndex(r => r.key === current.key)
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null
}
