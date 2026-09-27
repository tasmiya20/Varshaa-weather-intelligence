import { useState } from 'react'
import { IndiaMap } from '@/components/maps/IndiaMap'
import { MapLegend } from '@/components/maps/MapLegend'
import { IncidentDrawer } from '@/components/incidents/IncidentDrawer'
import { useMapStore, type MapLayer, type TimeRange } from '@/store/mapStore'
import type { Incident } from '@/types/incident'
import { cn } from '@/utils/cn'

const LAYERS: { key: MapLayer; label: string }[] = [
  { key: 'incidents', label: 'Incidents' }, { key: 'heatmap', label: 'Heatmap' },
  { key: 'citizenReports', label: 'Citizen Reports' }, { key: 'officialData', label: 'Official Data' },
  { key: 'rainfall', label: 'Rainfall' }, { key: 'floodZones', label: 'Flood Zones' },
  { key: 'thunderstorm', label: 'Thunderstorm' }, { key: 'emergingSignals', label: 'Emerging Signals' },
]
const RANGES: TimeRange[] = ['24h', '7d', '30d']

export default function LiveMap() {
  const [selected, setSelected] = useState<Incident | null>(null)
  const { activeLayers, toggleLayer, timeRange, setTimeRange } = useMapStore()

  return (
    <div className="flex h-full">
      <div className="w-64 shrink-0 overflow-y-auto border-r border-border bg-surface p-4">
        <div className="mb-5">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Layers</div>
          <div className="space-y-1.5">
            {LAYERS.map((l) => (
              <label key={l.key} className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
                <input type="checkbox" checked={activeLayers[l.key]} onChange={() => toggleLayer(l.key)} className="accent-primary" />
                {l.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Time Range</div>
          <div className="flex gap-1.5">
            {RANGES.map((r) => (
              <button key={r} onClick={() => setTimeRange(r)} className={cn('rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium', timeRange === r && 'border-primary bg-primary-light text-primary')}>
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex-1">
        <IndiaMap onSelectIncident={setSelected} />
        <MapLegend />
      </div>
      <IncidentDrawer incident={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
