import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

const LAYERS = [
  { name: 'Data Sources', tech: 'Social, Citizen, Weather APIs, Govt Data', purpose: 'Capture raw multi-channel weather signals', input: 'Public internet, mobile app, open data portals', output: 'Raw unstructured events' },
  { name: 'Ingestion', tech: 'Apache Kafka', purpose: 'Buffer and route high-volume signal streams reliably', input: 'Raw events from all sources', output: 'Partitioned topic streams' },
  { name: 'Stream Processing', tech: 'Apache Spark', purpose: 'Normalize, translate and enrich signals at scale', input: 'Kafka topics', output: 'Structured, normalized records' },
  { name: 'AI / ML', tech: 'NLP, Computer Vision, Dedup, Verification', purpose: 'Classify events, verify evidence, deduplicate reports', input: 'Normalized records', output: 'Scored, clustered incidents' },
  { name: 'Storage', tech: 'PostgreSQL, PostGIS, Object Storage', purpose: 'Persist incidents, media and geospatial data', input: 'Verified incident records', output: 'Queryable spatial datasets' },
  { name: 'API', tech: 'FastAPI', purpose: 'Serve incident and analytics data to clients', input: 'Storage layer', output: 'REST/JSON endpoints' },
  { name: 'Frontend', tech: 'React, MapLibre/Leaflet', purpose: 'Visualize intelligence for officials and citizens', input: 'API responses', output: 'Command center UI' },
]

export default function Architecture() {
  const [active, setActive] = useState(0)
  return (
    <div className="p-6">
      <PageHeader title="Big Data Architecture" description="Hover or select a layer to see its purpose, technology and data flow." />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-2">
          {LAYERS.map((l, i) => (
            <button
              key={l.name} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
              className={cn('block w-full rounded-xl2 border px-5 py-3.5 text-left transition-colors', active === i ? 'border-primary bg-primary-light' : 'border-border bg-surface hover:bg-canvas')}
            >
              <div className="font-semibold text-ink">{l.name}</div>
              <div className="text-[12px] text-ink-muted">{l.tech}</div>
            </button>
          ))}
        </div>
        <Card>
          <h3 className="font-bold text-ink">{LAYERS[active].name}</h3>
          <dl className="mt-3 space-y-2.5 text-[12.5px]">
            <div><dt className="font-semibold text-ink-muted">Purpose</dt><dd className="text-ink">{LAYERS[active].purpose}</dd></div>
            <div><dt className="font-semibold text-ink-muted">Technology</dt><dd className="text-ink">{LAYERS[active].tech}</dd></div>
            <div><dt className="font-semibold text-ink-muted">Input</dt><dd className="text-ink">{LAYERS[active].input}</dd></div>
            <div><dt className="font-semibold text-ink-muted">Output</dt><dd className="text-ink">{LAYERS[active].output}</dd></div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
