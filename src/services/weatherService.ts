import { stateSummaries, getStateSummary } from '@/data/states'
import { groundTruthComparisons, emergingSignals } from '@/data/weather'

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/** Adapter designed for future IMD / NDMA-SACHET / open government data integration. */
export const weatherService = {
  async getAllStateSummaries() { return delay(Object.values(stateSummaries)) },
  async getStateSummary(name: string) { return delay(getStateSummary(name)) },
  async getGroundTruthComparisons() { return delay(groundTruthComparisons) },
  async getEmergingSignals() { return delay(emergingSignals) },
}
