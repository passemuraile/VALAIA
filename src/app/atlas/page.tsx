import { BottomNav } from '@/components/layout/BottomNav'
export default function AtlasPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-24 relative z-10">
      <BottomNav />
      <p className="text-4xl mb-4">🗺</p>
      <h1 className="text-2xl font-black mb-2">L'Atlas</h1>
      <p className="text-white/40 text-sm text-center px-8">La carte interactive arrive bientôt.<br/>Explore le Codex en attendant.</p>
    </div>
  )
}
