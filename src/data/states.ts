import type { StateSummary } from '@/types/weather'

export const stateSummaries: Record<string, StateSummary> = {
  Maharashtra: { name: 'Maharashtra', activeIncidents: 42, rainfallReports: 18, floodReports: 12, thunderstormReports: 8, heatwaveReports: 4, verificationRate: 91 },
  Delhi: { name: 'Delhi', activeIncidents: 19, rainfallReports: 9, floodReports: 3, thunderstormReports: 5, heatwaveReports: 2, verificationRate: 86 },
  'West Bengal': { name: 'West Bengal', activeIncidents: 14, rainfallReports: 6, floodReports: 2, thunderstormReports: 5, heatwaveReports: 1, verificationRate: 82 },
  'Tamil Nadu': { name: 'Tamil Nadu', activeIncidents: 23, rainfallReports: 12, floodReports: 5, thunderstormReports: 4, heatwaveReports: 2, verificationRate: 89 },
  Karnataka: { name: 'Karnataka', activeIncidents: 11, rainfallReports: 5, floodReports: 1, thunderstormReports: 4, heatwaveReports: 1, verificationRate: 78 },
  Assam: { name: 'Assam', activeIncidents: 27, rainfallReports: 10, floodReports: 14, thunderstormReports: 2, heatwaveReports: 0, verificationRate: 85 },
  Telangana: { name: 'Telangana', activeIncidents: 16, rainfallReports: 6, floodReports: 2, thunderstormReports: 3, heatwaveReports: 5, verificationRate: 88 },
  Kerala: { name: 'Kerala', activeIncidents: 9, rainfallReports: 3, floodReports: 1, thunderstormReports: 1, heatwaveReports: 0, verificationRate: 94 },
  Gujarat: { name: 'Gujarat', activeIncidents: 8, rainfallReports: 2, floodReports: 0, thunderstormReports: 1, heatwaveReports: 5, verificationRate: 80 },
  Bihar: { name: 'Bihar', activeIncidents: 12, rainfallReports: 4, floodReports: 3, thunderstormReports: 2, heatwaveReports: 3, verificationRate: 76 },
}

export const getStateSummary = (name: string): StateSummary =>
  stateSummaries[name] ?? {
    name, activeIncidents: 0, rainfallReports: 0, floodReports: 0, thunderstormReports: 0, heatwaveReports: 0,
    verificationRate: 0,
  }
