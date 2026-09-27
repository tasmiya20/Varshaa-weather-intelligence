import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { verificationService } from '@/services/verificationService'
import { cn } from '@/utils/cn'

interface StageState { status: 'pending' | 'processing' | 'done'; detail?: string }

export function VerificationPipeline({ autoStart = true }: { autoStart?: boolean }) {
  const [stages, setStages] = useState<StageState[]>(
    verificationService.stages.map(() => ({ status: 'pending' }))
  )
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    if (!autoStart) return
    let cancelled = false
    verificationService.runPipeline((i, result) => {
      if (cancelled) return
      setStages((prev) => {
        const next = [...prev]
        next[i] = { status: result.status, detail: result.detail }
        return next
      })
    }).then((s) => !cancelled && setScore(s))
    return () => { cancelled = true }
  }, [autoStart])

  return (
    <div className="space-y-2.5">
      {verificationService.stages.map((name, i) => (
        <div key={name} className={cn('flex items-center gap-3 rounded-lg border border-border px-3.5 py-2.5', stages[i].status === 'done' && 'bg-success-light/40')}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border">
            {stages[i].status === 'done' ? <Check className="h-3.5 w-3.5 text-success" /> : stages[i].status === 'processing' ? <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> : null}
          </span>
          <span className="w-40 shrink-0 text-[12.5px] font-medium text-ink">{name}</span>
          <span className="text-[12px] text-ink-muted">{stages[i].detail ?? '—'}</span>
        </div>
      ))}
      {score !== null && (
        <div className="mt-3 rounded-lg bg-primary-light px-4 py-3 text-sm font-semibold text-primary">
          AI Evidence Score: {score}/100
        </div>
      )}
    </div>
  )
}
