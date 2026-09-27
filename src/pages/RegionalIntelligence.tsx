import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { IndiaMap } from '@/components/maps/IndiaMap'
import { Card } from '@/components/ui/Card'
import { useMapStore } from '@/store/mapStore'
import { getStateSummary } from '@/data/states'

export default function RegionalIntelligence() {
  const selectedState = useMapStore((s) => s.selectedState)
  const [, setDummy] = useState(0) // ensure re-render on store change if needed
  const summary = selectedState ? getStateSummary(selectedState) : null

  return (
    <div className="flex h-full">
      <div className="relative flex-1">
        <IndiaMap onSelectIncident={() => setDummy((d) => d + 1)} />
      </div>
      <div className="w-80 shrink-0 overflow-y-auto border-l border-border bg-surface p-5">
        <PageHeader title="Regional Intelligence" description="Click any state on the map for its live profile." />
        {summary ? (
          <Card>
            <h3 className="mb-3 font-bold text-ink">{summary.name.toUpperCase()}</h3>
            <Row label="Active incidents" value={summary.activeIncidents} />
            <Row label="Rainfall reports" value={summary.rainfallReports} />
            <Row label="Flood reports" value={summary.floodReports} />
            <Row label="Thunderstorm reports" value={summary.thunderstormReports} />
            <Row label="Heatwave reports" value={summary.heatwaveReports} />
            <Row label="Verification rate" value={`${summary.verificationRate}%`} />
          </Card>
        ) : (
          <p className="text-sm text-ink-muted">No state selected yet.</p>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string | number }) {
  return <div className="flex justify-between border-b border-border py-2 text-[13px]"><span className="text-ink-muted">{label}</span><span className="font-semibold text-ink">{value}</span></div>
}
