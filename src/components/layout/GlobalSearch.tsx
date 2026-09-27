import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { incidents } from '@/data/incidents'
import { Modal } from '@/components/ui/Modal'

export function GlobalSearch() {
  const { searchOpen, toggleSearch } = useDashboardStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        toggleSearch(true)
      }
      if (e.key === 'Escape') toggleSearch(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleSearch])

  const q = query.toLowerCase()
  const results = q
    ? incidents.filter((i) => i.city.toLowerCase().includes(q) || i.event.toLowerCase().includes(q) || i.state.toLowerCase().includes(q)).slice(0, 8)
    : []

  return (
    <>
      <button
        onClick={() => toggleSearch(true)}
        className="hidden items-center gap-2 rounded-lg border border-border bg-canvas px-3 py-2 text-[12.5px] text-ink-muted md:flex md:w-64"
      >
        <Search className="h-3.5 w-3.5" />
        Search incidents, states…
        <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 text-[9.5px] text-ink-faint">CTRL K</kbd>
      </button>
      <Modal open={searchOpen} onClose={() => toggleSearch(false)} title="Search VARSHAA">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Floods in Mumbai, Heatwave in Delhi…"
          className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <div className="mt-3 max-h-72 space-y-1 overflow-y-auto">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => { navigate(`/incidents?focus=${r.id}`); toggleSearch(false); setQuery('') }}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-canvas"
            >
              <div className="font-medium text-ink">{r.city} — {r.event}</div>
              <div className="text-[11.5px] text-ink-muted">{r.state} · {r.reportCount} reports</div>
            </button>
          ))}
          {q && results.length === 0 && <div className="px-3 py-6 text-center text-sm text-ink-muted">No matches for "{query}"</div>}
        </div>
      </Modal>
    </>
  )
}
