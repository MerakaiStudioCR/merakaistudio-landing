import { describe, expect, it } from 'vitest'
import { resolveDisplayApiError } from './resolve-display-api-error'

describe('resolveDisplayApiError', () => {
  const translate = (key: string) => `translated:${key}`

  it('maps known API errors to translated keys', () => {
    const message = resolveDisplayApiError(
      new Error(
        'Cannot close corrective action without successful verification.'
      ),
      translate,
      'close-error'
    )

    expect(message).toBe(
      'translated:operational.corrective-actions.close-needs-verification'
    )
  })

  it('maps open linked corrective action errors to the alert resolve message', () => {
    const message = resolveDisplayApiError(
      new Error(
        'Cannot resolve operational alert while a linked corrective action is still open. Close the corrective action first (with resolveLinkedAlert) or cancel it.'
      ),
      translate,
      'resolve-error'
    )

    expect(message).toBe(
      'translated:operational.alerts.resolve-blocked-open-corrective-action'
    )
  })

  it('returns translated fallback for technical SQL errors', () => {
    const message = resolveDisplayApiError(
      new Error(
        "Could not find stored procedure 'Payroll.usp_GetPayrollPaidHistory'."
      ),
      translate,
      'close-error'
    )

    expect(message).toBe('translated:api.error-messages.internal-error')
  })

  it('returns translated fallback when error is empty', () => {
    expect(
      resolveDisplayApiError(new Error(''), translate, 'close-error')
    ).toBe('translated:close-error')
  })
})
