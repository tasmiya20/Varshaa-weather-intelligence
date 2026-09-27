import type { GroundTruthComparison, EmergingSignal } from '@/types/weather'

export const groundTruthComparisons: GroundTruthComparison[] = [
  { location: 'Mumbai, Maharashtra', officialObservation: 'Moderate', citizenReports: 'High', gap: 'Significant' },
  { location: 'Chennai, Tamil Nadu', officialObservation: 'High', citizenReports: 'High', gap: 'Low' },
  { location: 'Delhi', officialObservation: 'Low', citizenReports: 'Moderate', gap: 'Moderate' },
]

export const emergingSignals: EmergingSignal[] = [
  { location: 'Mumbai', event: 'Flood-related reports', previousWindow: 12, currentWindow: 94, percentIncrease: 683 },
  { location: 'Guwahati', event: 'Flash flood reports', previousWindow: 8, currentWindow: 44, percentIncrease: 450 },
]
