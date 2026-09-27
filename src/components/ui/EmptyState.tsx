import type { LucideIcon } from 'lucide-react'

export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-border bg-white/60 py-16 text-center">
      <Icon className="mb-3 h-8 w-8 text-ink-faint" />
      <div className="font-semibold text-ink">{title}</div>
      {description && <div className="mt-1 max-w-sm text-sm text-ink-muted">{description}</div>}
    </div>
  )
}
