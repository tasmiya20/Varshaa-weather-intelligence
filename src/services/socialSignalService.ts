export interface IngestionMetrics {
  eventsPerMinute: number
  latencyMs: number
  queueDepth: number
  failedRate: number
}

/** Designed for future Kafka + Spark stream metrics. */
export const socialSignalService = {
  async getIngestionMetrics(): Promise<IngestionMetrics> {
    await new Promise((r) => setTimeout(r, 200))
    return { eventsPerMinute: 48621, latencyMs: 184, queueDepth: 1284, failedRate: 0.12 }
  },
}
