import getErrorMessage, { isErrorI18nKey } from './error-messages'

const TECHNICAL_ERROR_PATTERNS = [
  /stored procedure/i,
  /could not find/i,
  /invalid object name/i,
  /sql server/i,
  /\[sql/i,
  /deadlock/i,
  /violation of .* constraint/i,
  /incorrect syntax/i,
  /permission was denied/i,
  /login failed for user/i,
  /must be of type/i,
  /invalid column name/i,
  /api request failed \(\d+\)/i,
  /failed to parse api response/i,
  /api returned an empty response/i
]

export const isTechnicalErrorMessage = (message: string): boolean =>
  TECHNICAL_ERROR_PATTERNS.some((pattern) => pattern.test(message))

export const isSafeClientErrorKey = (key: string): boolean =>
  key.startsWith('api.') ||
  key.startsWith('auth.') ||
  isErrorI18nKey(key) ||
  (/^[a-z][a-z0-9-]*(\.[a-z][a-z0-9-]*)+$/i.test(key) && !/\s/.test(key))

export const sanitizeApiErrorKey = (
  message: string | undefined | null
): string => {
  const normalized = message?.trim() ?? ''
  if (!normalized) return 'api.error-messages.generic'

  if (isSafeClientErrorKey(normalized)) {
    return normalized
  }

  const mapped = getErrorMessage(normalized)
  if (mapped !== 'api.error-messages.generic') {
    return mapped
  }

  if (isTechnicalErrorMessage(normalized)) {
    return 'api.error-messages.internal-error'
  }

  return 'api.error-messages.generic'
}
