const ITEMS = [
  { label: 'Critical', color: '#DC2626' },
  { label: 'High', color: '#EA580C' },
  { label: 'Moderate', color: '#D97706' },
  { label: 'Verified / Low', color: '#16A34A' },
]

export function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap gap-3 rounded-xl2 border border-border bg-white/95 px-3.5 py-2.5 text-[11.5px] text-ink-muted shadow-panel backdrop-blur">
      {ITEMS.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  )
}
