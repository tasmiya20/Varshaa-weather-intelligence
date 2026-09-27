import { create } from 'zustand'
import type { Incident, IncidentFilters } from '@/types/incident'
import { incidentService } from '@/services/incidentService'

interface IncidentState {
  incidents: Incident[]
  filters: IncidentFilters
  selectedIncidentId: string | null
  loading: boolean
  setFilters: (f: Partial<IncidentFilters>) => void
  fetchIncidents: () => Promise<void>
  selectIncident: (id: string | null) => void
  verify: (id: string) => Promise<void>
  reject: (id: string) => Promise<void>
  markDuplicate: (id: string) => Promise<void>
}

export const defaultFilters: IncidentFilters = {
  query: '', state: 'all', event: 'all', severity: 'all', status: 'all',
}

export const useIncidentStore = create<IncidentState>((set, get) => ({
  incidents: [],
  filters: defaultFilters,
  selectedIncidentId: null,
  loading: false,

  setFilters: (f) => {
    set((s) => ({ filters: { ...s.filters, ...f } }))
    get().fetchIncidents()
  },

  fetchIncidents: async () => {
    set({ loading: true })
    const data = await incidentService.getIncidents(get().filters)
    set({ incidents: data, loading: false })
  },

  selectIncident: (id) => set({ selectedIncidentId: id }),

  verify: async (id) => {
    await incidentService.verifyIncident(id)
    await get().fetchIncidents()
  },
  reject: async (id) => {
    await incidentService.rejectIncident(id)
    await get().fetchIncidents()
  },
  markDuplicate: async (id) => {
    await incidentService.markDuplicate(id)
    await get().fetchIncidents()
  },
}))
