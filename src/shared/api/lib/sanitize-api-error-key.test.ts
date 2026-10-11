import { describe, expect, it } from 'vitest'
import {
  isTechnicalErrorMessage,
  sanitizeApiErrorKey
} from './sanitize-api-error-key'

describe('sanitizeApiErrorKey', () => {
  it('returns known i18n keys unchanged', () => {
    expect(sanitizeApiErrorKey('api.error-messages.not-found')).toBe(
      'api.error-messages.not-found'
    )
    expect(sanitizeApiErrorKey('auth.invalid-credentials')).toBe(
      'auth.invalid-credentials'
    )
  })

  it('maps known backend messages to i18n keys', () => {
    expect(sanitizeApiErrorKey('Invalid credentials')).toBe(
      'auth.invalid-credentials'
    )
    expect(sanitizeApiErrorKey('The requested resource was not found.')).toBe(
      'api.error-messages.not-found'
    )
    expect(
      sanitizeApiErrorKey(
        'Cannot resolve operational alert while a linked corrective action is still open. Close the corrective action first (with resolveLinkedAlert) or cancel it.'
      )
    ).toBe('operational.alerts.resolve-blocked-open-corrective-action')
    expect(sanitizeApiErrorKey('MeasuredAt cannot be in the future.')).toBe(
      'api.error-messages.measured-at-future'
    )
  })

  it('replaces technical SQL errors with internal-error key', () => {
    expect(
      sanitizeApiErrorKey(
        "Could not find stored procedure 'Payroll.usp_GetPayrollPaidHistory'."
      )
    ).toBe('api.error-messages.internal-error')
  })

  it('replaces unknown non-key messages with generic key', () => {
    expect(sanitizeApiErrorKey('Some random backend failure')).toBe(
      'api.error-messages.generic'
    )
  })

  it('returns generic key for empty messages', () => {
    expect(sanitizeApiErrorKey('')).toBe('api.error-messages.generic')
    expect(sanitizeApiErrorKey(null)).toBe('api.error-messages.generic')
  })
})

describe('isTechnicalErrorMessage', () => {
  it('detects stored procedure errors', () => {
    expect(
      isTechnicalErrorMessage(
        "Could not find stored procedure 'Payroll.usp_GetPayrollPaidHistory'."
      )
    ).toBe(true)
  })

  it('does not flag mapped business errors', () => {
    expect(isTechnicalErrorMessage('Invalid credentials')).toBe(false)
  })
})
