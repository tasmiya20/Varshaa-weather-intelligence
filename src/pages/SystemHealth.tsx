import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import type { ServiceHealth } from '@/types/system'

const SERVICES = ['Kafka', 'Spark', 'PostgreSQL', 'PostGIS', 'FastAPI', 'AI Service', 'Translation', 'Map Service']

function randomHealth(): ServiceHealth[] {
  return SERVICES.map((name) => ({
    name, status: 'healthy', latencyMs: 20 + Math.floor(Math.random() * 70),
    throughput: `${(2 + Math.random() * 6).toFixed(1)}k/min`, errorRate: +(Math.random() * 0.3).toFixed(2),
  }))
}

export default function SystemHealth() {
  const [services, setServices] = useState<ServiceHealth[]>(randomHealth())
  useEffect(() => { const t = setInterval(() => setServices(randomHealth()), 4000); return () => clearInterval(t) }, [])

  return (
    <div className="p-6">
      <PageHeader title="System Health" description="Pipeline status across ingestion, processing and AI services." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card key={s.name}>
            <div className="flex items-center gap-2 font-semibold text-ink"><span className="h-2 w-2 rounded-full bg-success" /> {s.name}</div>
            <div className="mt-2 text-[11.5px] text-ink-muted">Latency {s.latencyMs}ms · {s.throughput}</div>
            <div className="text-[11.5px] text-ink-muted">Error rate {s.errorRate}%</div>
            <div className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-success">HEALTHY</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
