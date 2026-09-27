import type { AlertDraft } from '@/types/alert'
import { alertDrafts } from '@/data/alerts'

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

/** Designed to later emit real CAP-compatible alerts via SMS/mobile/web gateways. */
export const alertService = {
  async getAlerts(): Promise<AlertDraft[]> {
    return delay(alertDrafts)
  },
  async generateAlert(partial: Omit<AlertDraft, 'id' | 'createdAt' | 'capCompatible'>): Promise<AlertDraft> {
    const draft: AlertDraft = {
      ...partial,
      id: `AL-${Math.floor(Math.random() * 900 + 100)}`,
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      capCompatible: true,
    }
    return delay(draft)
  },
}
