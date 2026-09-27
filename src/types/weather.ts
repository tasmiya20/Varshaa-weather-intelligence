export interface StateSummary {
  name: string
  activeIncidents: number
  rainfallReports: number
  floodReports: number
  thunderstormReports: number
  heatwaveReports: number
  verificationRate: number
}

export interface GroundTruthComparison {
  location: string
  officialObservation: 'Low' | 'Moderate' | 'High'
  citizenReports: 'Low' | 'Moderate' | 'High'
  gap: 'Low' | 'Moderate' | 'Significant'
}

export interface EmergingSignal {
  location: string
  event: string
  previousWindow: number
  currentWindow: number
  percentIncrease: number
}
