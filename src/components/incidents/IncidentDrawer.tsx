import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import type { Incident } from '@/types/incident'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SourceBadge } from '@/components/ui/SourceBadge'
import { Button } from '@/components/ui/Button'
import { Timeline } from './Timeline'
import { EvidenceScore } from '@/components/verification/EvidenceScore'
import { EvidenceMediaGrid } from './EvidenceMediaGrid'
import { useIncidentStore } from '@/store/incidentStore'

const TABS = ['Overview', 'Evidence', 'Timeline', 'Media'] as const

export function IncidentDrawer({ incident, onClose }: { incident: Incident | null; onClose: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview')
  const { verify, markDuplicate, reject } = useIncidentStore()

  return (
    <AnimatePresence>
      {incident && (
        <>
          <motion.div className="fixed inset-0 z-40 bg-slate-900/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface shadow-panel"
            initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex items-start justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-ink">{incident.city.toUpperCase()} — {incident.event.toUpperCase()}</h2>
                <div className="mt-1.5 flex gap-2"><SeverityBadge severity={incident.severity} /><StatusBadge status={incident.status} /></div>
              </div>
              <button onClick={onClose} className="rounded-md p-1 text-ink-muted hover:bg-canvas"><X className="h-4 w-4" /></button>
            </div>

            <div className="flex gap-1 border-b border-border px-5 pt-3">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-t-lg px-3 py-2 text-[12.5px] font-medium ${tab === t ? 'border-b-2 border-primary text-primary' : 'text-ink-muted'}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="p-5">
              {tab === 'Overview' && (
                <div className="space-y-3 text-sm">
                  <p className="text-ink-muted">{incident.summary}</p>
                  <Row label="State / District" value={`${incident.state} · ${incident.district}`} />
                  <Row label="Reports" value={String(incident.reportCount)} />
                  <Row label="Unique sources" value={String(incident.uniqueSources)} />
                  <Row label="Affected area" value={incident.affectedAreaKm2 ? `${incident.affectedAreaKm2} km²` : '—'} />
                  <Row label="First reported" value={incident.firstReported} />
                  <Row label="Last updated" value={incident.lastUpdated} />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {incident.sourceMix.map((s) => <SourceBadge key={s} type={s} />)}
                  </div>
                  <div className="pt-2">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Why this incident has high evidence</div>
                    <ul className="space-y-1.5">
                      {incident.whyVerified.map((w) => (
                        <li key={w} className="flex items-center gap-2 text-[12.5px] text-ink"><CheckCircle2 className="h-3.5 w-3.5 text-success" />{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button size="sm" onClick={() => verify(incident.id)}>Human Verify</Button>
                    <Button size="sm" variant="outline" onClick={() => markDuplicate(incident.id)}>Mark Duplicate</Button>
                    <Button size="sm" variant="outline" onClick={() => reject(incident.id)}>Reject</Button>
                  </div>
                </div>
              )}
              {tab === 'Evidence' && <EvidenceScore score={incident.evidenceScore} factors={incident.evidenceFactors} />}
              {tab === 'Timeline' && <Timeline events={incident.timeline} />}
              {tab === 'Media' && <EvidenceMediaGrid media={incident.media} />}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-1.5 text-[12.5px]">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  )
}
