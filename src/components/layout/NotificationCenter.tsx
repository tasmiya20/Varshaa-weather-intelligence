import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { cn } from '@/utils/cn'

const DOT: Record<string, string> = {
  critical: 'bg-danger', warning: 'bg-warning', review: 'bg-accent', system: 'bg-slate-400',
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const notifications = useDashboardStore((s) => s.notifications)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-lg p-2 text-ink-muted hover:bg-canvas"
        aria-label="Notifications"
      >
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl2 border border-border bg-surface p-2 shadow-panel">
          {notifications.map((n) => (
            <div key={n.id} className="flex gap-2.5 rounded-lg px-3 py-2.5 hover:bg-canvas">
              <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', DOT[n.level])} />
              <div>
                <div className="text-[10.5px] font-semibold tracking-wide text-ink-muted">{n.title}</div>
                <div className="text-[13px] text-ink">{n.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
