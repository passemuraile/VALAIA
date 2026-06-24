'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getFamily } from '@/lib/data/families'
import { getMemoriesByFamily } from '@/lib/data/memories'
import { useValaiaStore } from '@/store/useValaiaStore'
import { MemoryCard } from '@/components/codex/MemoryCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'

export default function FamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const { family: familyKey } = use(params)
  const family = getFamily(familyKey)
  if (!family) notFound()

  const memories = getMemoriesByFamily(familyKey).sort((a, b) => a.index - b.index)
  const { profile } = useValaiaStore()
  const discovered = memories.filter(m => profile.discoveredIds.includes(m.id)).length

  return (
    <main className="max-w-lg mx-auto">
      <div
        className="relative px-4 pt-14 pb-8"
        style={{ background: `linear-gradient(180deg, ${family.hex}18 0%, transparent 100%)` }}
      >
        <Link href="/codex" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
          <ArrowLeft size={15} />
          Codex
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{family.emoji}</span>
          <div>
            <h1 className={cn('text-2xl font-black', family.textClass)}>{family.name}</h1>
            <p className="text-sm text-white/40">{family.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className={cn('text-2xl font-black', family.textClass)}>{discovered}</span>
          <span className="text-white/40 text-sm">/ {family.total} mémoires</span>
        </div>
        <ProgressBar value={discovered} max={family.total} color={family.hex} />
      </div>

      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {memories.map(memory => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              family={family}
              discovered={profile.discoveredIds.includes(memory.id)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
