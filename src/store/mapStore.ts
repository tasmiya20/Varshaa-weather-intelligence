import { create } from 'zustand'

export type MapLayer = 'incidents' | 'heatmap' | 'citizenReports' | 'officialData' | 'rainfall' | 'floodZones' | 'thunderstorm' | 'emergingSignals'
export type TimeRange = '24h' | '7d' | '30d'

interface MapState {
  activeLayers: Record<MapLayer, boolean>
  timeRange: TimeRange
  selectedState: string | null
  toggleLayer: (layer: MapLayer) => void
  setTimeRange: (range: TimeRange) => void
  setSelectedState: (name: string | null) => void
}

export const useMapStore = create<MapState>((set) => ({
  activeLayers: {
    incidents: true, heatmap: false, citizenReports: true, officialData: true,
    rainfall: false, floodZones: false, thunderstorm: false, emergingSignals: true,
  },
  timeRange: '24h',
  selectedState: null,
  toggleLayer: (layer) =>
    set((s) => ({ activeLayers: { ...s.activeLayers, [layer]: !s.activeLayers[layer] } })),
  setTimeRange: (range) => set({ timeRange: range }),
  setSelectedState: (name) => set({ selectedState: name }),
}))
