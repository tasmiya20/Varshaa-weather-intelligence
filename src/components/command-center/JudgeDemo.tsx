import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { CheckCircle2, Loader2 } from 'lucide-react'

const STEPS = [
  'Social signals arrive', 'Citizen photo arrives', 'NLP classifies flood',
  'Image verification begins', 'Duplicate reports cluster', 'Official correlation appears',
  'Evidence score increases', 'Incident appears on map', 'Human verification',
  'Alert draft generated', 'Incident timeline updates',
]

export function JudgeDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!open) { setStep(0); return }
    if (step >= STEPS.length) return
    const t = setTimeout(() => setStep((s) => s + 1), 1400)
    return () => clearTimeout(t)
  }, [open, step])

  return (
    <Modal open={open} onClose={onClose} title="Judge Demo — Heavy Rainfall → Mumbai Urban Flood">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
        Step {Math.min(step + 1, STEPS.length)} / {STEPS.length}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${(Math.min(step, STEPS.length) / STEPS.length) * 100}%` }} />
      </div>
      <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2.5 text-sm">
            {i < step ? <CheckCircle2 className="h-4 w-4 text-success" /> : i === step ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <span className="h-4 w-4 rounded-full border border-border" />}
            <span className={i <= step ? 'text-ink' : 'text-ink-faint'}>{s}</span>
          </div>
        ))}
      </div>
      {step >= STEPS.length && (
        <div className="mt-4 rounded-lg bg-success-light px-3 py-2.5 text-sm font-medium text-success">
          Scenario complete — incident verified end-to-end in demo mode.
        </div>
      )}
    </Modal>
  )
}
