import { BottomNav } from '@/components/layout/BottomNav'

export default function CodexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 pb-24 min-h-screen">
      {children}
      <BottomNav />
    </div>
  )
}
