import { useEffect } from 'react'
import { Radio, ShieldCheck, Clock3, Siren, Activity } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { StatCard } from '@/components/ui/StatCard'

export function StatusBar() {
  const { liveSignals, verifiedIncidents, underReview, criticalZones, eventsPerMinute, tick } = useDashboardStore()

  useEffect(() => {
    const t = setInterval(tick, 3000)
    return () => clearInterval(t)
  }, [tick])

  return (
    <div className="flex flex-wrap divide-x divide-border border-b border-border bg-surface">
      <StatCard label="Live Signal Ingestion" value={liveSignals.toLocaleString()} icon={Radio} />
      <StatCard label="Verified Incidents" value={verifiedIncidents.toLocaleString()} icon={ShieldCheck} tone="success" />
      <StatCard label="Under Review" value={underReview.toLocaleString()} icon={Clock3} tone="warning" />
      <StatCard label="Critical Zones" value={criticalZones} icon={Siren} tone="danger" />
      <StatCard label="Events / Min" value={eventsPerMinute.toLocaleString()} icon={Activity} />
    </div>
  )
}
