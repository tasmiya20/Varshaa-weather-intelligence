import { useState } from 'react'
import { StatusBar } from '@/components/command-center/StatusBar'
import { LiveFeed } from '@/components/command-center/LiveFeed'
import { IndiaMap } from '@/components/maps/IndiaMap'
import { MapLegend } from '@/components/maps/MapLegend'
import { IncidentDrawer } from '@/components/incidents/IncidentDrawer'
import { getIncidentById } from '@/data/incidents'
import type { Incident } from '@/types/incident'

export default function CommandCenter() {
  const [selected, setSelected] = useState<Incident | null>(null)

  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1">
          <IndiaMap onSelectIncident={setSelected} />
          <MapLegend />
        </div>
        <LiveFeed onSelect={(id) => setSelected(getIncidentById(id) ?? null)} />
      </div>
      <IncidentDrawer incident={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
