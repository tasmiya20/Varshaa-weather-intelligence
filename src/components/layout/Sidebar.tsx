import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Map, ListChecks, ShieldCheck, MessageSquarePlus, BarChart3,
  Siren, Globe2, Database, Network, PlayCircle, Settings, HeartPulse,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const NAV = [
  { to: '/command-center', label: 'Command Center', icon: LayoutDashboard },
  { to: '/live-map', label: 'Live Map', icon: Map },
  { to: '/incidents', label: 'Incident Intelligence', icon: ListChecks },
  { to: '/verification', label: 'AI Verification', icon: ShieldCheck },
  { to: '/citizen-report', label: 'Citizen Reports', icon: MessageSquarePlus },
  { to: '/analytics', label: 'Weather Analytics', icon: BarChart3 },
  { to: '/alerts', label: 'Alert Command', icon: Siren },
  { to: '/regional', label: 'Regional Intelligence', icon: Globe2 },
  { to: '/data-sources', label: 'Data Sources', icon: Database },
  { to: '/architecture', label: 'Architecture', icon: Network },
  { to: '/replay', label: 'Disaster Replay', icon: PlayCircle },
  { to: '/admin', label: 'Admin Panel', icon: Settings },
  { to: '/system-health', label: 'System Health', icon: HeartPulse },
]

export function Sidebar() {
  return (
    <aside className="hidden w-[228px] shrink-0 flex-col border-r border-border bg-surface py-4 md:flex">
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-ink-muted transition-colors hover:bg-canvas',
                isActive && 'bg-primary-light text-primary'
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mx-3 mt-2 rounded-lg border border-border bg-canvas px-3 py-2.5 text-[11px] text-ink-muted">
        <span className="font-semibold text-warning">DEMO STREAM</span> — all data is seeded
      </div>
    </aside>
  )
}
