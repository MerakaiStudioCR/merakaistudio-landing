/** API/i18n keys that mean “no rows for this query”, not a system failure. */
const EMPTY_RESULT_ERROR_KEYS = new Set(['api.error-messages.not-found'])

export function isEmptyResultError(message: string | undefined): boolean {
  if (!message) return false
  return EMPTY_RESULT_ERROR_KEYS.has(message)
}
