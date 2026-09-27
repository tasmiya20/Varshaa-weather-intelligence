export interface TranslationResult {
  detectedLanguage: string
  translatedText: string
}

/** Designed for future BHASHINI integration. */
export const translationService = {
  async translate(text: string, fromHint?: string): Promise<TranslationResult> {
    await new Promise((r) => setTimeout(r, 400))
    return {
      detectedLanguage: fromHint || 'Hindi',
      translatedText: 'Severe waterlogging reported in the affected area.',
    }
  },
}
