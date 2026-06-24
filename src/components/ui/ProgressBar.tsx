interface Props {
  value: number
  max: number
  color?: string
  className?: string
}

export function ProgressBar({ value, max, color = '#C9A84C', className = '' }: Props) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div className={`h-1.5 rounded-full overflow-hidden bg-white/[0.06] ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
        }}
      />
    </div>
  )
}
