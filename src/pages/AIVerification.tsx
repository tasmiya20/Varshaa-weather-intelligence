import { PageHeader } from '@/components/layout/PageHeader'
import { VerificationPipeline } from '@/components/verification/VerificationPipeline'
import { Card } from '@/components/ui/Card'

interface ReportPanelData { title: string; rows: string[][]; score: number; verdict: string; tone: 'success' | 'danger' }

const REPORT_A: ReportPanelData = { title: '"Flood in Mumbai"', rows: [['Metadata', 'Available'], ['Timestamp', 'Recent'], ['Location', 'Matched'], ['Weather correlation', 'High'], ['Duplicate', 'No match']], score: 92, verdict: 'LIKELY AUTHENTIC', tone: 'success' }
const REPORT_B: ReportPanelData = { title: '"Old Flood Image"', rows: [['Metadata', 'Missing'], ['Image similarity', 'High'], ['Location', 'Mismatch'], ['Weather correlation', 'Low'], ['Duplicate', 'Match found']], score: 18, verdict: 'FLAGGED FOR REVIEW', tone: 'danger' }

function ReportPanel({ data }: { data: ReportPanelData }) {
  return (
    <Card>
      <h3 className="font-semibold text-ink">{data.title}</h3>
      <div className="mt-3 space-y-1.5">
        {data.rows.map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-border py-1.5 text-[12.5px]">
            <span className="text-ink-muted">{k}</span><span className="font-medium text-ink">{v}</span>
          </div>
        ))}
      </div>
      <div className={`mt-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${data.tone === 'success' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'}`}>
        Score {data.score}/100 — {data.verdict}
      </div>
    </Card>
  )
}

export default function AIVerification() {
  return (
    <div className="p-6">
      <PageHeader title="AI Verification Lab" description="How VARSHAA scores the strength of evidence behind every report — a confidence signal, not proof." />
      <Card className="mb-6">
        <h3 className="mb-3 font-semibold text-ink">Live pipeline (demo report)</h3>
        <VerificationPipeline />
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        <ReportPanel data={REPORT_A} />
        <ReportPanel data={REPORT_B} />
      </div>
      <p className="mt-4 text-[11.5px] text-ink-faint">Reverse-image search is represented here as a planned integration adapter, pending a connected provider.</p>
    </div>
  )
}
