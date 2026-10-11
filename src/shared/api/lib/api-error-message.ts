const isGenericGatewayDetail = (detail: string): boolean =>
  /^Request failed with status code \d+$/i.test(detail.trim())

const formatValidationErrors = (errors: unknown[]): string =>
  errors
    .map((entry) => {
      if (typeof entry === 'string') return entry
      if (entry && typeof entry === 'object') {
        const e = entry as Record<string, unknown>
        const field = e.field ?? e.property ?? e.path
        const msg = e.message ?? e.error ?? e.detail
        if (field && msg) return `${String(field)}: ${String(msg)}`
        if (msg) return String(msg)
      }
      return JSON.stringify(entry)
    })
    .filter(Boolean)
    .join('; ')

import { sanitizeApiErrorKey } from './sanitize-api-error-key'

/**
 * Extracts a human-readable message from common API error shapes
 * (ProblemDetails, NestJS HttpException, plain error field).
 */
export const getApiErrorMessage = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') return null

  const record = data as Record<string, unknown>

  if (Array.isArray(record.errors) && record.errors.length > 0) {
    const formatted = formatValidationErrors(record.errors)
    if (formatted) return formatted
  }

  if (typeof record.detail === 'string' && record.detail.trim()) {
    if (!isGenericGatewayDetail(record.detail)) {
      return record.detail
    }
  }

  if (typeof record.title === 'string' && record.title.trim()) {
    return record.title
  }

  if (Array.isArray(record.message)) {
    const parts = record.message.map(String).filter(Boolean)
    if (parts.length > 0) return parts.join(', ')
  }

  if (typeof record.message === 'string' && record.message.trim()) {
    return record.message
  }

  if (typeof record.error === 'string' && record.error.trim()) {
    return record.error
  }

  return null
}

/** Maps upstream API error payloads to a safe i18n key for clients. */
export const getSanitizedApiErrorKey = (data: unknown): string =>
  sanitizeApiErrorKey(getApiErrorMessage(data))
