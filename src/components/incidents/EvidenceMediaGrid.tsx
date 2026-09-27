import { ImageIcon, Video } from 'lucide-react'
import type { EvidenceMedia } from '@/types/incident'

export function EvidenceMediaGrid({ media }: { media: EvidenceMedia[] }) {
  if (media.length === 0) {
    return <div className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-ink-faint">No media submitted with this incident.</div>
  }
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {media.map((m) => (
        <div key={m.id} className="group relative flex aspect-video flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-gradient-to-br from-primary-light to-accent-light text-primary">
          {m.type === 'image' ? <ImageIcon className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          <span className="px-2 text-center text-[10px] font-medium leading-tight text-primary/80">{m.caption}</span>
          <span className="absolute right-1.5 top-1.5 rounded bg-white/80 px-1.5 py-0.5 text-[8.5px] font-semibold uppercase text-ink-faint">Demo placeholder</span>
        </div>
      ))}
    </div>
  )
}
