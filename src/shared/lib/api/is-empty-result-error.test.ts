import { describe, expect, it } from 'vitest'
import { isEmptyResultError } from './is-empty-result-error'

describe('isEmptyResultError', () => {
  it('returns true for api not-found i18n key', () => {
    expect(isEmptyResultError('api.error-messages.not-found')).toBe(true)
  })

  it('returns false for generic and auth errors', () => {
    expect(isEmptyResultError('api.error-messages.generic')).toBe(false)
    expect(isEmptyResultError('auth.invalid-credentials')).toBe(false)
    expect(isEmptyResultError(undefined)).toBe(false)
  })
})
