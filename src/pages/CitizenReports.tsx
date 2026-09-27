import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Camera, Video, Mic, CheckCircle2, X, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { reportService } from '@/services/reportService'
import { translationService } from '@/services/translationService'
import type { CitizenReportResult } from '@/types/report'

const EVENTS = ['Heavy Rainfall', 'Flood', 'Thunderstorm', 'Lightning', 'Heatwave', 'Fog', 'Dust Storm', 'Strong Winds', 'Other'] as const

const schema = z.object({
  event: z.enum(EVENTS),
  locationLabel: z.string().min(2, 'Please add a location'),
  description: z.string().min(3, 'Please describe what you see'),
})
type FormValues = z.infer<typeof schema>

interface MediaPreview { id: string; type: 'image' | 'video'; url: string; name: string }

export default function CitizenReports() {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { event: 'Heavy Rainfall', locationLabel: '', description: '' },
  })
  const [media, setMedia] = useState<MediaPreview[]>([])
  const [result, setResult] = useState<CitizenReportResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [voiceState, setVoiceState] = useState<'idle' | 'processing' | 'done'>('idle')
  const [voiceResult, setVoiceResult] = useState<{ detected: string; translated: string } | null>(null)
  const photoRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  const onFiles = (files: FileList | null, type: 'image' | 'video') => {
    if (!files) return
    const next = Array.from(files).map((f) => ({ id: `${Date.now()}-${f.name}`, type, url: URL.createObjectURL(f), name: f.name }))
    setMedia((m) => [...m, ...next])
  }

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    const r = await reportService.createCitizenReport({ ...values, mediaFiles: [] })
    setResult(r)
    setSubmitting(false)
  }

  const runVoiceDemo = async () => {
    setVoiceState('processing')
    const t = await translationService.translate('Ulwe mein road pe bahut paani bhar gaya hai.', 'Hindi')
    setVoiceResult({ detected: t.detectedLanguage, translated: t.translatedText })
    setVoiceState('done')
    setValue('event', 'Flood')
    setValue('description', t.translatedText)
  }

  if (result) {
    return (
      <div className="mx-auto max-w-lg p-6">
        <Card className="text-center">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-success" />
          <h2 className="text-lg font-bold text-ink">Report Received</h2>
          <div className="mt-4 space-y-1.5 text-left text-[13px]">
            <Row label="Report ID" value={result.reportId} />
            <Row label="Location" value={result.locationLabel} />
            <Row label="AI classification" value={result.aiClassifiedEvent} />
            <Row label="Initial evidence" value={`${result.initialEvidenceScore}/100`} />
            <Row label="Status" value="Under verification" />
          </div>
          <Button className="mt-5" onClick={() => { setResult(null); setMedia([]) }}>Submit another report</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <PageHeader title="Report a Weather Incident" description="Simple, fast, and available in your language." />

      <Card className="mb-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"><Mic className="h-4 w-4 text-primary" /> Voice-to-Incident (demo)</div>
        <p className="mb-3 text-[12.5px] text-ink-muted">Try: "Ulwe mein road pe bahut paani bhar gaya hai."</p>
        <Button variant="outline" size="sm" onClick={runVoiceDemo} disabled={voiceState === 'processing'}>
          {voiceState === 'processing' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Mic className="h-3.5 w-3.5" />}
          {voiceState === 'processing' ? 'Processing…' : 'Simulate voice report'}
        </Button>
        {voiceResult && (
          <div className="mt-3 space-y-1 rounded-lg bg-canvas p-3 text-[12.5px]">
            <div><span className="font-semibold text-ink-muted">Detected language:</span> {voiceResult.detected}</div>
            <div><span className="font-semibold text-ink-muted">Translated:</span> {voiceResult.translated}</div>
            <div className="text-success">Event and description pre-filled below.</div>
          </div>
        )}
      </Card>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11.5px] font-semibold text-ink-muted">Event type</label>
            <select {...register('event')} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm">
              {EVENTS.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11.5px] font-semibold text-ink-muted">Location</label>
            <div className="flex gap-2">
              <Controller
                name="locationLabel" control={control}
                render={({ field }) => <input {...field} placeholder="e.g. Navi Mumbai" className="flex-1 rounded-lg border border-border px-3 py-2.5 text-sm" />}
              />
              <Button type="button" variant="outline" size="sm" onClick={() => setValue('locationLabel', 'Navi Mumbai · 19.03°N (GPS)')}>
                <MapPin className="h-3.5 w-3.5" />
              </Button>
            </div>
            {errors.locationLabel && <p className="mt-1 text-[11px] text-danger">{errors.locationLabel.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-[11.5px] font-semibold text-ink-muted">Describe what you see</label>
            <textarea {...register('description')} rows={3} placeholder="e.g. Road near Ulwe is completely waterlogged" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm" />
            {errors.description && <p className="mt-1 text-[11px] text-danger">{errors.description.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-[11.5px] font-semibold text-ink-muted">Photo / video evidence (optional)</label>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => photoRef.current?.click()}><Camera className="h-3.5 w-3.5" /> Upload photo</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => videoRef.current?.click()}><Video className="h-3.5 w-3.5" /> Upload video</Button>
            </div>
            <input ref={photoRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files, 'image')} />
            <input ref={videoRef} type="file" accept="video/*" multiple hidden onChange={(e) => onFiles(e.target.files, 'video')} />
            {media.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {media.map((m) => (
                  <div key={m.id} className="group relative overflow-hidden rounded-lg border border-border">
                    {m.type === 'image' ? <img src={m.url} className="h-20 w-full object-cover" /> : <video src={m.url} className="h-20 w-full object-cover" />}
                    <button type="button" onClick={() => setMedia((ms) => ms.filter((x) => x.id !== m.id))} className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-1.5 text-[11px] text-ink-faint">Files stay in your browser for this demo and are used only as visual proof previews.</p>
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Submit report
          </Button>
        </form>
      </Card>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between border-b border-border py-1.5"><span className="text-ink-muted">{label}</span><span className="font-medium text-ink">{value}</span></div>
}
