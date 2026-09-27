import { create } from 'zustand'

interface Notification {
  id: string
  level: 'critical' | 'warning' | 'review' | 'system'
  title: string
  message: string
}

interface DashboardState {
  liveSignals: number
  verifiedIncidents: number
  underReview: number
  criticalZones: number
  eventsPerMinute: number
  notifications: Notification[]
  searchOpen: boolean
  toggleSearch: (open?: boolean) => void
  tick: () => void
}

const seedNotifications: Notification[] = [
  { id: 'n1', level: 'critical', title: 'CRITICAL', message: 'Flood cluster detected in Mumbai' },
  { id: 'n2', level: 'warning', title: 'WARNING', message: 'Rapid increase in rainfall reports' },
  { id: 'n3', level: 'review', title: 'REVIEW', message: '23 incidents awaiting verification' },
  { id: 'n4', level: 'system', title: 'SYSTEM', message: 'Data ingestion increased 28%' },
]

export const useDashboardStore = create<DashboardState>((set, get) => ({
  liveSignals: 12842,
  verifiedIncidents: 1284,
  underReview: 327,
  criticalZones: 18,
  eventsPerMinute: 48621,
  notifications: seedNotifications,
  searchOpen: false,
  toggleSearch: (open) => set((s) => ({ searchOpen: open ?? !s.searchOpen })),
  tick: () =>
    set((s) => ({
      liveSignals: s.liveSignals + Math.floor(Math.random() * 6),
      eventsPerMinute: 48000 + Math.floor(Math.random() * 2000),
    })),
}))
