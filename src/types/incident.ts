export type Severity = 'critical' | 'high' | 'moderate' | 'low'
export type VerificationStatus =
  | 'unverified'
  | 'under_review'
  | 'ai_verified'
  | 'human_verified'
  | 'rejected'
  | 'duplicate'
export type SourceType = 'official' | 'public' | 'citizen' | 'social' | 'ai_inferred'
export type WeatherEvent =
  | 'Heavy Rainfall' | 'Flood' | 'Flash Flood' | 'Thunderstorm' | 'Lightning'
  | 'Cyclone' | 'Heatwave' | 'Cold Wave' | 'Fog' | 'Dust Storm'
  | 'Strong Winds' | 'Waterlogging' | 'Hailstorm' | 'Coastal Surge' | 'Other'

export interface EvidenceFactor {
  label: string
  points: number
  maxPoints: number
}

export interface EvidenceMedia {
  id: string
  type: 'image' | 'video'
  caption: string
  /** In demo mode this is a locally generated placeholder, never a fabricated real photo. */
  placeholder: true
}

export interface TimelineEvent {
  time: string
  label: string
}

export interface Incident {
  id: string
  city: string
  state: string
  district: string
  lat: number
  lng: number
  event: WeatherEvent
  severity: Severity
  status: VerificationStatus
  evidenceScore: number
  reportCount: number
  uniqueSources: number
  affectedAreaKm2: number | null
  firstReported: string
  lastUpdated: string
  sourceMix: SourceType[]
  evidenceFactors: EvidenceFactor[]
  whyVerified: string[]
  timeline: TimelineEvent[]
  media: EvidenceMedia[]
  summary: string
}

export interface IncidentFilters {
  query: string
  state: string | 'all'
  event: WeatherEvent | 'all'
  severity: Severity | 'all'
  status: VerificationStatus | 'all'
}
