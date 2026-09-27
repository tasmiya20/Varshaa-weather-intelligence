import { cn } from '@/utils/cn'
import type { VerificationStatus } from '@/types/incident'

const STYLES: Record<VerificationStatus, string> = {
  unverified: 'bg-slate-100 text-slate-600',
  under_review: 'bg-warning-light text-warning',
  ai_verified: 'bg-accent-light text-accent',
  human_verified: 'bg-success-light text-success',
  rejected: 'bg-danger-light text-danger',
  duplicate: 'bg-slate-100 text-slate-500',
}

const LABELS: Record<VerificationStatus, string> = {
  unverified: 'Unverified',
  under_review: 'Under Review',
  ai_verified: 'AI Verified',
  human_verified: 'Human Verified',
  rejected: 'Rejected',
  duplicate: 'Duplicate',
}

export function StatusBadge({ status, className }: { status: VerificationStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide', STYLES[status], className)}>
      {LABELS[status]}
    </span>
  )
}
