import { Landmark, Users, MessageCircle, Database, CloudSun, Newspaper } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'

const SOURCES = [
  { icon: Landmark, title: 'Government / IMD', desc: 'Official observations & warnings', count: '4 feeds' },
  { icon: Users, title: 'Citizen Reports', desc: 'Direct ground submissions', count: '2,481 (24h)' },
  { icon: MessageCircle, title: 'Social Media', desc: 'Public posts mentioning hazards', count: '9,204 (24h)' },
  { icon: Database, title: 'Public Datasets', desc: 'Open government weather data', count: '6 datasets' },
  { icon: CloudSun, title: 'Weather APIs', desc: 'Third-party meteorological feeds', count: '3 providers' },
  { icon: Newspaper, title: 'Media', desc: 'News & broadcast mentions', count: '312 (24h)' },
]

export default function DataSources() {
  return (
    <div className="p-6">
      <PageHeader title="Source Ecosystem" description="Every incident is transparent about where its evidence came from." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SOURCES.map((s) => (
          <Card key={s.title}>
            <s.icon className="mb-2.5 h-5 w-5 text-primary" />
            <h3 className="font-semibold text-ink">{s.title}</h3>
            <p className="text-[12.5px] text-ink-muted">{s.desc}</p>
            <p className="mt-2 text-sm font-semibold text-accent">{s.count}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
