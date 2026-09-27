import type { EvidenceFactor } from '@/types/incident'

export function EvidenceScore({ score, factors }: { score: number; factors: EvidenceFactor[] }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-lg font-bold text-primary"
          style={{ background: `conic-gradient(#0B3D91 ${score}%, #E3E8F0 0)` }}
        >
          <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white" style={{ height: 60, width: 60 }}>
            {score}%
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">AI Evidence Score</div>
          <p className="mt-1 text-[12.5px] text-ink-muted">This score represents the strength of available evidence and does not guarantee authenticity.</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {factors.map((f) => (
          <div key={f.label} className="flex items-center gap-3 text-[12.5px]">
            <span className="w-36 shrink-0 text-ink-muted">{f.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(f.points / f.maxPoints) * 100}%` }} />
            </div>
            <span className="w-14 shrink-0 text-right text-ink-faint">+{f.points}/{f.maxPoints}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
