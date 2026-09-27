import { incidents } from '@/data/incidents'
import { SeverityBadge } from '@/components/ui/SeverityBadge'

export function LiveFeed({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-surface xl:flex">
      <div className="border-b border-border px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
        Live Intelligence Feed
      </div>
      <div className="flex-1 overflow-y-auto">
        {incidents.map((inc) => (
          <button key={inc.id} onClick={() => onSelect(inc.id)} className="block w-full border-b border-border px-4 py-3 text-left hover:bg-canvas">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">{inc.city}, {inc.state.slice(0, 2).toUpperCase()}</span>
              <span className="text-[10.5px] text-ink-faint">{inc.lastUpdated}</span>
            </div>
            <div className="mt-1 flex items-center gap-2"><SeverityBadge severity={inc.severity} /></div>
            <p className="mt-1 text-[12px] text-ink-muted">{inc.reportCount} reports consolidated · {inc.status.replace('_', ' ')}</p>
          </button>
        ))}
      </div>
    </aside>
  )
}
