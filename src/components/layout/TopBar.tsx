import { Link } from 'react-router-dom'
import { CloudLightning, Radio, PlayCircle, LogOut } from 'lucide-react'
import { GlobalSearch } from './GlobalSearch'
import { NotificationCenter } from './NotificationCenter'

export function TopBar({ onJudgeDemo }: { onJudgeDemo: () => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:px-6">
      <Link to="/command-center" className="flex items-center gap-2 font-bold text-primary">
        <CloudLightning className="h-5 w-5" />
        <span className="hidden sm:inline">VARSHAA</span>
      </Link>
      <div className="flex items-center gap-3">
        <GlobalSearch />
        <span className="hidden items-center gap-1.5 rounded-full border border-success/30 bg-success-light px-2.5 py-1 text-[11px] font-semibold text-success lg:flex">
          <Radio className="h-3 w-3" /> SYSTEM OPERATIONAL
        </span>
        <button
          onClick={onJudgeDemo}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[12px] font-semibold text-white hover:bg-primary-dark"
        >
          <PlayCircle className="h-3.5 w-3.5" /> JUDGE DEMO
        </button>
        <NotificationCenter />
        <Link
          to="/"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[12px] font-semibold text-ink-muted hover:border-primary hover:text-primary"
        >
          <LogOut className="h-3.5 w-3.5" /> Exit
        </Link>
      </div>
    </header>
  )
}
