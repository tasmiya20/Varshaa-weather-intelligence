import type { PropsWithChildren } from 'react'
import { Card } from '@/components/ui/Card'

export function ChartCard({ title, question, children }: PropsWithChildren<{ title: string; question: string }>) {
  return (
    <Card>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <p className="text-[11.5px] text-ink-faint">{question}</p>
      </div>
      <div className="h-56">{children}</div>
    </Card>
  )
}
