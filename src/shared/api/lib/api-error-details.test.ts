import { describe, expect, it } from 'vitest'
import { assignApiErrorDetails, readApiErrorDetails } from './api-error-details'

describe('api-error-details', () => {
  it('reads transfer 409 extras from a nested payload', () => {
    expect(
      readApiErrorDetails({
        result: {
          code: 'CONNECTION_TRANSFER_PENDING_INVOICES',
          pendingInvoiceCount: 2,
          invoiceNumbers: ['4401', '4402']
        }
      })
    ).toEqual({
      code: 'CONNECTION_TRANSFER_PENDING_INVOICES',
      pendingInvoiceCount: 2,
      invoiceNumbers: ['4401', '4402']
    })
  })

  it('assigns extras onto an error object', () => {
    const error = assignApiErrorDetails(new Error('x'), {
      code: 'PAYMENT_API_UNAVAILABLE'
    })
    expect(error.code).toBe('PAYMENT_API_UNAVAILABLE')
  })
})
