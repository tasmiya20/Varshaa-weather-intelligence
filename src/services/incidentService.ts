import { incidents as mockIncidents, getIncidentById } from '@/data/incidents'
import type { Incident, IncidentFilters } from '@/types/incident'

const LATENCY = 220

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/**
 * Service interface designed to be backed later by FastAPI + PostGIS.
 * Current implementation returns seeded demo data ("DEMO STREAM").
 */
export const incidentService = {
  async getIncidents(filters?: Partial<IncidentFilters>): Promise<Incident[]> {
    let result = [...mockIncidents]
    if (filters?.query) {
      const q = filters.query.toLowerCase()
      result = result.filter(
        (i) => i.city.toLowerCase().includes(q) || i.event.toLowerCase().includes(q) || i.state.toLowerCase().includes(q)
      )
    }
    if (filters?.state && filters.state !== 'all') result = result.filter((i) => i.state === filters.state)
    if (filters?.event && filters.event !== 'all') result = result.filter((i) => i.event === filters.event)
    if (filters?.severity && filters.severity !== 'all') result = result.filter((i) => i.severity === filters.severity)
    if (filters?.status && filters.status !== 'all') result = result.filter((i) => i.status === filters.status)
    return delay(result)
  },

  async getIncidentById(id: string): Promise<Incident | undefined> {
    return delay(getIncidentById(id))
  },

  async verifyIncident(id: string): Promise<Incident | undefined> {
    const inc = getIncidentById(id)
    if (inc) inc.status = 'human_verified'
    return delay(inc)
  },

  async markDuplicate(id: string): Promise<Incident | undefined> {
    const inc = getIncidentById(id)
    if (inc) inc.status = 'duplicate'
    return delay(inc)
  },

  async rejectIncident(id: string): Promise<Incident | undefined> {
    const inc = getIncidentById(id)
    if (inc) inc.status = 'rejected'
    return delay(inc)
  },
}
