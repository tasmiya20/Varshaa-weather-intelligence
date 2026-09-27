import type { WeatherEvent } from './incident'

export type ReportInputMode = 'location' | 'photo' | 'video' | 'voice' | 'text'

export interface CitizenReportInput {
  event: WeatherEvent
  locationLabel: string
  description: string
  mediaFiles: File[]
  language?: string
}

export interface CitizenReportResult {
  reportId: string
  locationLabel: string
  aiClassifiedEvent: WeatherEvent
  initialEvidenceScore: number
  status: 'under_verification'
  submittedAt: string
}

export interface VoiceToIncidentResult {
  detectedLanguage: string
  originalText: string
  translatedText: string
  event: WeatherEvent
  severity: 'high' | 'moderate' | 'low'
}
