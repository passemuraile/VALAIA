'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Sparkles, Lock, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { getMemory } from '@/lib/data/memories'
import { getFamily } from '@/lib/data/families'
import { useValaiaStore } from '@/store/useValaiaStore'
import { RarityBadge, rarityColor } from '@/components/ui/RarityBadge'
import { cn } from '@/lib/utils'
import { BottomNav } from '@/components/layout/BottomNav'
import type { QuizQuestion, DiscoveryMode } from '@/types/valaia'

const DISCOVERY_LABEL: Record<string, string> = {
  gps: '📍 GPS',
  qr: '🔲 QR Code',
  photo: '📷 Photo',
  quiz: '🧠 Quiz',
  event: '🎭 Événement',
}

export default function MemoryPage({ params }: { params: { id: string } }) {
  // All hooks first — no use(params), no conditional hooks
  const { isDiscovered, hasQuizCompleted, discoverMemory, completeQuiz } = useValaiaStore()
  const [quizActive, setQuizActive] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const memory = getMemory(params.id)
  const family = memory ? getFamily(memory.familyKey) : undefined

  const discovered = memory ? isDiscovered(memory.id) : false
  const quizDone = memory ? hasQuizCompleted(memory.id) : false
  const cardColor = memory ? rarityColor(memory.rarity) : '#9CA3AF'

  // 404 — after all hooks
  if (!memory || !family) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pb-28 px-8 text-center relative z-10">
        <BottomNav />
        <p className="text-6xl mb-6 opacity-20">🔍</p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          Introuvable
        </p>
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          Mémoire inconnue
        </h2>
        <p className="text-sm text-white/30 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
          Cette mémoire n'existe pas dans le Codex.
        </p>
        <Link href="/codex" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors">
          <ArrowLeft size={14} /> Retour au Codex
        </Link>
      </div>
    )
  }

  const quizQuestions = memory.quiz ?? []
  const quizAllAnswered = quizQuestions.length > 0 && quizAnswers.length === quizQuestions.length && quizAnswers.every(a => a !== null)
  const quizAllCorrect = quizQuestions.every((q, i) => quizAnswers[i] === q.correctIndex)

  function handleDiscover() {
    discoverMemory(memory!.id, memory!.xpReward)
  }

  function handleQuizSubmit() {
    if (quizAllCorrect) {
      completeQuiz(memory!.id)
      setQuizSubmitted(true)
    }
  }

  function initQuiz() {
    setQuizAnswers(quizQuestions.map(() => null))
    setQuizActive(v => !v)
  }

  return (
    <main className="max-w-lg mx-auto min-h-screen">
      <BottomNav />

      <div
        className="relative px-4 pt-14 pb-10 overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${family.hex}28 0%, ${cardColor}14 50%, transparent 100%)` }}
      >
        <Link
          href={`/codex/${family.key}`}
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          {family.name}
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: family.hex, fontFamily: 'var(--font-cinzel), serif' }}>
            {family.emoji} {family.name} #{String(memory.index).padStart(3, '0')}
          </span>
          <RarityBadge rarity={memory.rarity} />
        </div>

        <h1 className="text-3xl font-black tracking-tight leading-tight mb-1 text-white" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
          {discovered ? memory.name : '???'}
        </h1>
        {discovered && (
          <p className="text-base font-medium" style={{ color: family.hex, fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
            {memory.subtitle}
          </p>
        )}
        {discovered && (
          <div className="flex items-center gap-1.5 mt-3 text-sm text-white/40">
            <MapPin size={13} />
            <span>{memory.location}</span>
          </div>
        )}

        <div className="absolute right-4 top-10 text-[120px] opacity-[0.04] select-none pointer-events-none">
          {family.emoji}
        </div>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-5">

        {!discovered && (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 flex flex-col gap-4 items-center text-center">
            <Lock size={32} className="text-white/20" />
            <p className="text-white/60 text-sm leading-relaxed">{memory.hint}</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {(memory.discoveryModes ?? []).map((m: DiscoveryMode) => (
                <span key={m} className="text-[11px] bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-1">
                  {DISCOVERY_LABEL[m] ?? m}
                </span>
              ))}
            </div>
            <button
              onClick={handleDiscover}
              className="mt-1 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white border border-white/20 bg-white/[0.06] hover:bg-white/10"
              style={{ borderColor: `${family.hex}50` }}
            >
              Simuler la découverte ✦
            </button>
          </div>
        )}

        {discovered && (
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: `${family.hex}30`, background: `${family.hex}09` }}
          >
            <p className="text-[11px] uppercase tracking-widest mb-3" style={{ color: family.hex, fontFamily: 'var(--font-cinzel), serif' }}>
              Mémoire débloquée
            </p>
            <p className="text-sm text-white/80 leading-relaxed">{memory.excerpt}</p>
          </div>
        )}

        {discovered && (
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <Sparkles size={16} style={{ color: cardColor }} />
            <span className="text-sm text-white/60">Découverte</span>
            <span className="ml-auto text-sm font-bold" style={{ color: cardColor }}>
              +{memory.xpReward} XP
            </span>
          </div>
        )}

        {memory.seasonalOnly && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3">
            <p className="text-xs text-amber-300/80">🗓 {memory.seasonalOnly.label}</p>
          </div>
        )}

        {discovered && quizQuestions.length > 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden">
            <button
              onClick={initQuiz}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-2">
                {quizDone
                  ? <CheckCircle2 size={16} className="text-emerald-400" />
                  : <span className="text-base">🧠</span>
                }
                <span className="text-sm font-semibold text-white">
                  {quizDone ? 'Histoire complète débloquée' : "Débloquer l'histoire complète"}
                </span>
              </div>
              {quizActive ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
            </button>

            {quizActive && (
              <div className="px-5 pb-5 flex flex-col gap-5 border-t border-white/[0.05]">
                {quizDone && (
                  <div className="pt-4">
                    <p className="text-sm text-white/70 leading-relaxed">{memory.story}</p>
                  </div>
                )}

                {!quizDone && !quizSubmitted && quizQuestions.map((q: QuizQuestion, qi: number) => (
                  <div key={qi} className="flex flex-col gap-2 pt-4">
                    <p className="text-sm font-medium text-white/80">{q.question}</p>
                    {q.options.map((opt: string, oi: number) => (
                      <button
                        key={oi}
                        onClick={() => {
                          const next = [...quizAnswers]
                          next[qi] = oi
                          setQuizAnswers(next)
                        }}
                        className={cn(
                          'text-left text-sm px-3 py-2.5 rounded-xl border transition-all duration-150',
                          quizAnswers[qi] === oi
                            ? 'border-white/30 bg-white/10 text-white'
                            : 'border-white/[0.06] bg-white/[0.03] text-white/50 hover:bg-white/[0.06]'
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ))}

                {!quizDone && !quizSubmitted && (
                  <button
                    disabled={!quizAllAnswered}
                    onClick={handleQuizSubmit}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                      quizAllAnswered
                        ? 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                        : 'bg-white/[0.03] border border-white/[0.05] text-white/25 cursor-not-allowed'
                    )}
                  >
                    Valider mes réponses
                  </button>
                )}

                {quizSubmitted && !quizAllCorrect && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3">
                    <p className="text-sm text-rose-300">Certaines réponses sont incorrectes. Réessaie !</p>
                    <button
                      onClick={() => { setQuizAnswers(quizQuestions.map(() => null)); setQuizSubmitted(false) }}
                      className="mt-2 text-xs text-white/50 hover:text-white/80 transition-colors"
                    >
                      Recommencer →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {discovered && (memory.tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {(memory.tags ?? []).map((tag: string) => (
              <span key={tag} className="text-[11px] bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-0.5 text-white/30">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {discovered && (memory.relatedIds ?? []).length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/25 mb-3" style={{ fontFamily: 'var(--font-cinzel), serif' }}>
              Connexions
            </p>
            <div className="flex flex-col gap-2">
              {(memory.relatedIds ?? []).map((rid: string) => {
                const rel = getMemory(rid)
                if (!rel) return null
                const relFamily = getFamily(rel.familyKey)
                if (!relFamily) return null
                return (
                  <Link
                    key={rid}
                    href={`/codex/memory/${rid}`}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="text-xl">{relFamily.emoji}</span>
                    <div>
                      <p className="text-sm text-white/70">{rel.name}</p>
                      <p className="text-[11px] text-white/30">{relFamily.name}</p>
                    </div>
                    <RarityBadge rarity={rel.rarity} className="ml-auto" />
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
