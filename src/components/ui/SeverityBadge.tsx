import { cn } from '@/utils/cn'
import type { Severity } from '@/types/incident'

const STYLES: Record<Severity, string> = {
  critical: 'bg-danger-light text-danger',
  high: 'bg-orange-50 text-orange-600',
  moderate: 'bg-warning-light text-warning',
  low: 'bg-success-light text-success',
}

const DOT: Record<Severity, string> = {
  critical: 'bg-danger', high: 'bg-orange-500', moderate: 'bg-warning', low: 'bg-success',
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide', STYLES[severity], className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', DOT[severity])} />
      {severity}
    </span>
  )
}
