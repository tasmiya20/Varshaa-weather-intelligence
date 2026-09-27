import type { TimelineEvent } from '@/types/incident'

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-4 border-l border-border pl-5">
      {events.map((e, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-white" />
          <div className="text-[11px] font-semibold text-ink-faint">{e.time}</div>
          <div className="text-sm text-ink">{e.label}</div>
        </li>
      ))}
    </ol>
  )
}
