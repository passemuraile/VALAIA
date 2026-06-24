import { cn } from '@/lib/utils'

interface Props {
  value: number
  max: number
  color?: string
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, max, color = '#8b5cf6', className, showLabel }: Props) {
  const pct = Math.min(100, max > 0 ? Math.round((value / max) * 100) : 0)
  return (
    <div className={cn('relative', className)}>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      {showLabel && (
        <span className="absolute right-0 -top-5 text-[10px] text-white/40">{value}/{max}</span>
      )}
    </div>
  )
}
