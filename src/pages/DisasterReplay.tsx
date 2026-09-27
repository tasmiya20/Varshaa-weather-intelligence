import { useEffect, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { IndiaMap } from '@/components/maps/IndiaMap'

const STEPS = [
  { t: 'T+00', label: 'First citizen report', incidents: 1 },
  { t: 'T+15', label: 'Social signals increase', incidents: 4 },
  { t: 'T+30', label: 'Incident cluster detected', incidents: 12 },
  { t: 'T+45', label: 'Flood reports expand', incidents: 38 },
  { t: 'T+60', label: 'Critical zone declared', incidents: 63 },
]

export default function DisasterReplay() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || step >= STEPS.length - 1) { if (step >= STEPS.length - 1) setPlaying(false); return }
    const t = setTimeout(() => setStep((s) => s + 1), 1300)
    return () => clearTimeout(t)
  }, [playing, step])

  return (
    <div className="p-6">
      <PageHeader
        title="Incident Replay — Mumbai Urban Flood"
        description="Reconstruct how a verified event unfolded, minute by minute."
        actions={
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setPlaying((p) => !p)}>{playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />} {playing ? 'Pause' : 'Play'}</Button>
            <Button size="sm" variant="outline" onClick={() => { setStep(0); setPlaying(false) }}><RotateCcw className="h-3.5 w-3.5" /> Reset</Button>
          </div>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="relative h-[420px] overflow-hidden rounded-xl2 border border-border">
          <IndiaMap onSelectIncident={() => {}} />
        </div>
        <Card>
          <div className="mb-3 text-sm font-semibold text-ink">Timeline — {STEPS[step].incidents} incidents reported</div>
          <input type="range" min={0} max={STEPS.length - 1} value={step} onChange={(e) => setStep(Number(e.target.value))} className="w-full accent-primary" />
          <ol className="mt-4 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className={`rounded-lg border px-3 py-2.5 text-[12.5px] ${i <= step ? 'border-primary bg-primary-light text-primary' : 'border-border text-ink-faint'}`}>
                <span className="font-semibold">{s.t}</span> — {s.label}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
}
