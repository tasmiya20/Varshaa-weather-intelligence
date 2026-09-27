import { Search } from 'lucide-react'
import { useIncidentStore, defaultFilters } from '@/store/incidentStore'
import { stateSummaries } from '@/data/states'

const EVENTS = ['Heavy Rainfall', 'Flood', 'Flash Flood', 'Thunderstorm', 'Lightning', 'Waterlogging', 'Hailstorm', 'Coastal Surge']
const SEVERITIES = ['critical', 'high', 'moderate', 'low']
const STATUSES = ['unverified', 'under_review', 'ai_verified', 'human_verified', 'rejected', 'duplicate']

export function FilterBar() {
  const { filters, setFilters } = useIncidentStore()

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2.5 rounded-xl2 border border-border bg-surface p-3 shadow-card">
      <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2">
        <Search className="h-3.5 w-3.5 text-ink-faint" />
        <input
          value={filters.query}
          onChange={(e) => setFilters({ query: e.target.value })}
          placeholder="Search city, event, state…"
          className="w-full text-[13px] outline-none"
        />
      </div>
      <Select value={filters.state} onChange={(v) => setFilters({ state: v as typeof filters.state })} options={['all', ...Object.keys(stateSummaries)]} label="State" />
      <Select value={filters.event} onChange={(v) => setFilters({ event: v as typeof filters.event })} options={['all', ...EVENTS]} label="Event" />
      <Select value={filters.severity} onChange={(v) => setFilters({ severity: v as typeof filters.severity })} options={['all', ...SEVERITIES]} label="Severity" />
      <Select value={filters.status} onChange={(v) => setFilters({ status: v as typeof filters.status })} options={['all', ...STATUSES]} label="Status" />
      <button onClick={() => setFilters(defaultFilters)} className="text-[12px] font-medium text-primary hover:underline">Reset</button>
    </div>
  )
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-border bg-white px-2.5 py-2 text-[12.5px] text-ink outline-none"
    >
      {options.map((o) => <option key={o} value={o}>{o === 'all' ? `All ${label}` : o.replace('_', ' ')}</option>)}
    </select>
  )
}
