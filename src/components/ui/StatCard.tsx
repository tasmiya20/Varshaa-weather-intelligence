import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface StatCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  tone?: 'default' | 'danger' | 'success' | 'warning'
  hint?: string
}

const TONE: Record<NonNullable<StatCardProps['tone']>, string> = {
  default: 'text-primary', danger: 'text-danger', success: 'text-success', warning: 'text-warning',
}

export function StatCard({ label, value, icon: Icon, tone = 'default', hint }: StatCardProps) {
  return (
    <div className="flex-1 border-r border-border px-5 py-3.5 last:border-r-0">
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn('h-3.5 w-3.5', TONE[tone])} />}
        <span className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
      </div>
      <div className={cn('mt-1 font-sans text-2xl font-bold tabular-nums', TONE[tone])}>{value}</div>
      {hint && <div className="text-[10.5px] text-ink-faint">{hint}</div>}
    </div>
  )
}
