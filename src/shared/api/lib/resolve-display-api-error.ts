import { sanitizeApiErrorKey } from './sanitize-api-error-key'

export const resolveDisplayApiError = (
  error: unknown,
  translate: (key: string) => string,
  fallbackKey: string
): string => {
  const message = error instanceof Error ? error.message.trim() : ''

  if (!message) {
    return translate(fallbackKey)
  }

  return translate(sanitizeApiErrorKey(message))
}
