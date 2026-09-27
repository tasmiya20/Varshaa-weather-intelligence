export interface VerificationStageResult {
  stage: string
  status: 'pending' | 'processing' | 'done'
  detail?: string
  ms?: number
}

/** Designed to be backed later by real NLP / CV / geospatial verification microservices. */
export const verificationService = {
  stages: [
    'Source', 'Text Analysis', 'Image Analysis', 'Metadata Check',
    'Location Check', 'Temporal Check', 'Duplicate Check', 'Weather Correlation', 'AI Evidence Score',
  ],

  async runPipeline(onStage: (index: number, result: VerificationStageResult) => void): Promise<number> {
    const details = [
      'Signal accepted', 'Event keywords matched', 'No manipulation detected (98ms)',
      'EXIF timestamp present', '97% GPS match', 'Within expected window',
      'No duplicate match found', 'Strong correlation with rainfall data', 'Computed',
    ]
    for (let i = 0; i < this.stages.length; i++) {
      onStage(i, { stage: this.stages[i], status: 'processing' })
      await new Promise((r) => setTimeout(r, 260))
      onStage(i, { stage: this.stages[i], status: 'done', detail: details[i] })
    }
    return 92
  },
}
