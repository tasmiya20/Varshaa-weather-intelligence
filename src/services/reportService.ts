import type { CitizenReportInput, CitizenReportResult } from '@/types/report'

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/** Designed to be backed later by a real ingestion + NLP classification API. */
export const reportService = {
  async createCitizenReport(input: CitizenReportInput): Promise<CitizenReportResult> {
    const id = `WR-2026-${Math.floor(100000 + Math.random() * 899999)}`
    return delay({
      reportId: id,
      locationLabel: input.locationLabel || 'Location pending',
      aiClassifiedEvent: input.event,
      initialEvidenceScore: 70 + Math.floor(Math.random() * 20),
      status: 'under_verification',
      submittedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    })
  },
}
