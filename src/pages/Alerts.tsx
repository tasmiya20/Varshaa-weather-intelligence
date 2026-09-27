import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { alertService } from '@/services/alertService'
import type { AlertDraft } from '@/types/alert'

interface FormValues { title: string; event: string; region: string; severity: AlertDraft['severity']; description: string; recommendedActions: string }

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertDraft[]>([])
  const [preview, setPreview] = useState<AlertDraft | null>(null)
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { title: '', event: 'Flood', region: '', severity: 'High', description: '', recommendedActions: '' },
  })

  useEffect(() => { alertService.getAlerts().then(setAlerts) }, [])

  const onSubmit = async (values: FormValues) => {
    const draft = await alertService.generateAlert({ ...values, languages: ['English', 'Hindi'] })
    setAlerts((a) => [draft, ...a])
    setPreview(draft)
    reset()
  }

  return (
    <div className="p-6">
      <PageHeader title="Alert Command" description="Draft alerts from verified incidents. Demo mode — no live dissemination is triggered." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-semibold text-ink">Active alert drafts</h3>
          <div className="space-y-2.5">
            {alerts.map((a) => (
              <button key={a.id} onClick={() => setPreview(a)} className="block w-full rounded-lg border border-border p-3 text-left hover:bg-canvas">
                <div className="flex justify-between text-[13px] font-semibold text-ink"><span>{a.title}</span><span className="text-ink-faint">{a.severity}</span></div>
                <div className="text-[12px] text-ink-muted">{a.region} · {a.createdAt}</div>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 font-semibold text-ink">Generate new alert</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input {...register('title', { required: true })} placeholder="Alert title" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm" />
            <div className="grid grid-cols-2 gap-2.5">
              <input {...register('event', { required: true })} placeholder="Event type" className="rounded-lg border border-border px-3 py-2.5 text-sm" />
              <select {...register('severity')} className="rounded-lg border border-border px-3 py-2.5 text-sm">
                <option>Critical</option><option>High</option><option>Moderate</option>
              </select>
            </div>
            <input {...register('region', { required: true })} placeholder="Region, e.g. Mumbai, Maharashtra" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm" />
            <textarea {...register('description', { required: true })} rows={2} placeholder="Description" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm" />
            <textarea {...register('recommendedActions', { required: true })} rows={2} placeholder="Recommended actions" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm" />
            <Button type="submit" className="w-full">Preview alert</Button>
          </form>
        </Card>
      </div>

      {preview && (
        <Card className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-ink">{preview.title}</h3>
            <span className="rounded-full bg-primary-light px-2.5 py-1 text-[10.5px] font-semibold text-primary">CAP-COMPATIBLE (DEMO)</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {(['SMS', 'MOBILE', 'WEB'] as const).map((ch) => (
              <div key={ch} className="rounded-lg border border-border bg-canvas p-3 text-[12px]">
                <div className="mb-1 font-semibold text-ink-muted">{ch} PREVIEW</div>
                <div className="text-ink">{preview.severity.toUpperCase()}: {preview.title} — {preview.recommendedActions}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
