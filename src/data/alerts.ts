import type { AlertDraft } from '@/types/alert'

export const alertDrafts: AlertDraft[] = [
  { id: 'AL-01', title: 'Mumbai Urban Flood Advisory', event: 'Flood', region: 'Mumbai, Maharashtra', severity: 'Critical', description: 'Severe waterlogging across low-lying areas.', recommendedActions: 'Avoid low-lying and underpass roads. Move to higher ground if affected.', languages: ['English', 'Marathi', 'Hindi'], createdAt: '14:22 IST', capCompatible: true },
  { id: 'AL-02', title: 'Guwahati Flash Flood Watch', event: 'Flash Flood', region: 'Guwahati, Assam', severity: 'High', description: 'Rapid rise in river levels following upstream rainfall.', recommendedActions: 'Residents near riverbanks should stay alert and follow local authority guidance.', languages: ['English', 'Assamese', 'Hindi'], createdAt: '06:05 IST', capCompatible: true },
  { id: 'AL-03', title: 'Kolkata Thunderstorm Notice', event: 'Thunderstorm', region: 'Kolkata, West Bengal', severity: 'Moderate', description: 'Lightning activity reported across central districts.', recommendedActions: 'Avoid open areas and tall isolated structures during the storm.', languages: ['English', 'Bengali'], createdAt: '17:31 IST', capCompatible: true },
]
