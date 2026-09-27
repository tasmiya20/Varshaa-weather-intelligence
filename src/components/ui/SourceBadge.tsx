import { cn } from '@/utils/cn'
import type { SourceType } from '@/types/incident'

const LABELS: Record<SourceType, string> = {
  official: 'Official', public: 'Public', citizen: 'Citizen', social: 'Social', ai_inferred: 'AI-Inferred',
}
const STYLES: Record<SourceType, string> = {
  official: 'bg-success-light text-success',
  public: 'bg-primary-light text-primary',
  citizen: 'bg-accent-light text-accent',
  social: 'bg-slate-100 text-slate-600',
  ai_inferred: 'bg-warning-light text-warning',
}

export function SourceBadge({ type, className }: { type: SourceType; className?: string }) {
  return (
    <span className={cn('inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-medium', STYLES[type], className)}>
      {LABELS[type]}
    </span>
  )
}
