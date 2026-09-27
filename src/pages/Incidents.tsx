import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterBar } from '@/components/incidents/FilterBar'
import { IncidentCard } from '@/components/incidents/IncidentCard'
import { IncidentDrawer } from '@/components/incidents/IncidentDrawer'
import { LoadingState } from '@/components/ui/LoadingState'
import { EmptyState } from '@/components/ui/EmptyState'
import { useIncidentStore } from '@/store/incidentStore'
import { SearchX } from 'lucide-react'
import type { Incident } from '@/types/incident'

export default function Incidents() {
  const { incidents, loading, fetchIncidents } = useIncidentStore()
  const [selected, setSelected] = useState<Incident | null>(null)

  useEffect(() => { fetchIncidents() }, [fetchIncidents])

  return (
    <div className="p-6">
      <PageHeader title="Incident Intelligence" description="All active and recent incident clusters, ranked by severity. Click a card for full evidence." />
      <FilterBar />
      {loading ? (
        <LoadingState label="Loading incidents…" />
      ) : incidents.length === 0 ? (
        <EmptyState icon={SearchX} title="No incidents match your filters" description="Try widening your filters or resetting them." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {incidents.map((inc) => <IncidentCard key={inc.id} incident={inc} onClick={() => setSelected(inc)} />)}
        </div>
      )}
      <IncidentDrawer incident={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
