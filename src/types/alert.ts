export interface AlertDraft {
  id: string
  title: string
  event: string
  region: string
  severity: 'Critical' | 'High' | 'Moderate'
  description: string
  recommendedActions: string
  languages: string[]
  createdAt: string
  capCompatible: true
}
