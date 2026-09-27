import { CloudRain, MapPin, Users } from 'lucide-react'
import type { Incident } from '@/types/incident'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Card } from '@/components/ui/Card'

export function IncidentCard({ incident, onClick }: { incident: Incident; onClick: () => void }) {
  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-panel" onClick={onClick}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <CloudRain className="h-4 w-4 text-primary" />
          {incident.city}
        </div>
        <SeverityBadge severity={incident.severity} />
      </div>
      <div className="mt-1.5 flex items-center gap-1 text-[12.5px] text-ink-muted">
        <MapPin className="h-3 w-3" /> {incident.state} · {incident.event}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <StatusBadge status={incident.status} />
        <span className="flex items-center gap-1 text-[11.5px] text-ink-faint">
          <Users className="h-3 w-3" /> {incident.reportCount} reports · {incident.uniqueSources} sources
        </span>
      </div>
      <div className="mt-2 text-[11px] text-ink-faint">Evidence score: <span className="font-semibold text-primary">{incident.evidenceScore}%</span></div>
    </Card>
  )
}
