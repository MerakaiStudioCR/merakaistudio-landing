import { describe, it, expect } from 'vitest'
import getErrorMessage, { isKnownError } from './error-messages'

describe('error-messages utilities', () => {
  describe('getErrorMessage', () => {
    it('should return i18n key for known auth errors', () => {
      expect(getErrorMessage('Invalid credentials')).toBe(
        'auth.invalid-credentials'
      )
      expect(getErrorMessage('Validation failed')).toBe(
        'api.error-messages.validation-error'
      )
      expect(getErrorMessage('Email not confirmed')).toBe(
        'auth.email-not-confirmed'
      )
      expect(getErrorMessage('ASADA not selected')).toBe(
        'api.error-messages.asada-not-selected'
      )
      expect(getErrorMessage('Unauthorized')).toBe('auth.invalid-credentials')
      expect(getErrorMessage('Auth user not found')).toBe(
        'auth.profile-not-found'
      )
    })

    it('should return i18n key for token expiry error', () => {
      expect(getErrorMessage('JWT verification failed: jwt expired')).toBe(
        'auth.token-expired'
      )
    })

    it('should return i18n key for duplicate reading error', () => {
      expect(
        getErrorMessage(
          'There is already a measurement for this PodConnectorId in the current month.'
        )
      ).toBe('readings.alerts.duplicate-reading-error')
    })

    it('should return i18n key for measured-at-in-the-future errors', () => {
      expect(getErrorMessage('MeasuredAt cannot be in the future.')).toBe(
        'api.error-messages.measured-at-future'
      )
    })

    it('should return i18n key for external API unauthorized error', () => {
      expect(
        getErrorMessage('You are not authorized to access this resource.')
      ).toBe('api.error-messages.unauthorized')
    })

    it('should return i18n key for external API forbidden error', () => {
      expect(
        getErrorMessage('You do not have permission to perform this action.')
      ).toBe('api.error-messages.forbidden')
    })

    it('should return i18n key for external API not found error', () => {
      expect(getErrorMessage('The requested resource was not found.')).toBe(
        'api.error-messages.not-found'
      )
    })

    it('should return i18n key for validation errors', () => {
      expect(getErrorMessage('One or more validation errors occurred.')).toBe(
        'api.error-messages.validation-error'
      )
    })

    it('should return i18n key for unprocessable errors', () => {
      expect(
        getErrorMessage(
          'The request was well-formed but contains semantic errors.'
        )
      ).toBe('api.error-messages.unprocessable')
    })

    it('should return i18n key for internal server errors', () => {
      expect(getErrorMessage('An unexpected error has occurred.')).toBe(
        'api.error-messages.internal-error'
      )
    })

    it('should return i18n key for database errors', () => {
      expect(
        getErrorMessage(
          'A database error occurred while processing your request.'
        )
      ).toBe('api.error-messages.database-error')
    })

    it('should return i18n key for timeout errors', () => {
      expect(
        getErrorMessage('The request timed out. Please try again later.')
      ).toBe('api.error-messages.timeout')
    })

    it('should return i18n key for too many requests', () => {
      expect(getErrorMessage('Too many requests')).toBe(
        'api.error-messages.too-many-requests'
      )
    })

    it('should return i18n key for connection errors', () => {
      expect(
        getErrorMessage(
          'Unable to establish connection. Please try again later.'
        )
      ).toBe('api.error-messages.connection-error')
    })

    it('should return i18n key for external service errors', () => {
      expect(
        getErrorMessage(
          'An error occurred while communicating with an external service.'
        )
      ).toBe('api.error-messages.external-service-error')
    })

    it('should return i18n key for invalid object errors', () => {
      expect(
        getErrorMessage('The requested object is invalid or no longer exists.')
      ).toBe('api.error-messages.invalid-object')
    })

    it('should return i18n key for transaction errors', () => {
      expect(
        getErrorMessage(
          'A transaction error occurred. The operation was not completed.'
        )
      ).toBe('api.error-messages.transaction-error')
    })

    it('should return i18n key for connections bulk CSV errors', () => {
      expect(
        getErrorMessage('Invalid SectorId or sector does not belong to ASADA.')
      ).toBe('connections.bulk.errors.invalid-sector')
      expect(
        getErrorMessage(
          'UserId/AuthUserId does not have effective access to this ASADA.'
        )
      ).toBe('connections.bulk.errors.no-effective-access')
    })

    it('should return i18n key for local validation errors', () => {
      expect(getErrorMessage('Resource not found')).toBe(
        'api.error-messages.not-found'
      )
      expect(getErrorMessage('Invalid parameter')).toBe(
        'api.error-messages.validation-error'
      )
      expect(getErrorMessage('Parameter is required')).toBe(
        'api.error-messages.validation-error'
      )
      expect(getErrorMessage('Delete operation failed')).toBe(
        'api.error-messages.internal-error'
      )
    })

    it('should return i18n key for open linked corrective action on alert resolve', () => {
      expect(
        getErrorMessage(
          'Cannot resolve operational alert while a linked corrective action is still open. Close the corrective action first (with resolveLinkedAlert) or cancel it.'
        )
      ).toBe('operational.alerts.resolve-blocked-open-corrective-action')
    })

    it('should return i18n key for hydric water-management errors', () => {
      expect(getErrorMessage('Period end must be after period start.')).toBe(
        'hydric.errors.invalid-period'
      )
      expect(
        getErrorMessage(
          'A water system with this code already exists for the ASADA.'
        )
      ).toBe('hydric.errors.system-code-exists')
      expect(
        getErrorMessage(
          'Macrometer reading cannot decrease without RESET, ROLLOVER, REPLACEMENT or CORRECTION.'
        )
      ).toBe('hydric.errors.reading-decrease')
      expect(
        getErrorMessage('Unknown or inactive waterSourceTypeCode: X.')
      ).toBe('hydric.errors.unknown-source-type')
      expect(getErrorMessage('Duplicate sampleNumber: 1.')).toBe(
        'hydric.errors.duplicate-sample'
      )
      expect(getErrorMessage('Client must not send calculated flowLps.')).toBe(
        'hydric.errors.client-flow-forbidden'
      )
      expect(getErrorMessage('waterSystemId must be a UUID')).toBe(
        'hydric.errors.system-id-uuid'
      )
    })

    it('should return i18n key for previous-cycle payment reversal errors', () => {
      expect(
        getErrorMessage(
          'Cannot reverse a payment applied to an invoice from a previous billing cycle.'
        )
      ).toBe('payments.payment-detail.reverse-error-previous-cycle')
    })

    it('should return i18n key for vacation registration business errors', () => {
      expect(getErrorMessage('Insufficient vacation days balance.')).toBe(
        'payroll.employees.detail.vacations.errors.insufficient-balance'
      )
      expect(
        getErrorMessage(
          'Cannot modify a vacation period that has already started.'
        )
      ).toBe('payroll.employees.detail.vacations.errors.already-started-edit')
      expect(
        getErrorMessage(
          'Cannot delete a vacation period that has already started.'
        )
      ).toBe('payroll.employees.detail.vacations.errors.already-started-delete')
      expect(getErrorMessage('StartDate must be in the future.')).toBe(
        'payroll.employees.detail.vacations.errors.start-date-must-be-future'
      )
    })

    it('should return generic error message for unknown errors', () => {
      expect(getErrorMessage('Some unknown error')).toBe(
        'api.error-messages.generic'
      )
    })

    it('should not use raw error text as default message', () => {
      expect(
        getErrorMessage(
          "Could not find stored procedure 'Payroll.usp_GetPayrollPaidHistory'.",
          "Could not find stored procedure 'Payroll.usp_GetPayrollPaidHistory'."
        )
      ).toBe('api.error-messages.generic')
    })

    it('should use custom default message when provided as i18n key', () => {
      expect(getErrorMessage('Unknown error', 'custom.default.message')).toBe(
        'custom.default.message'
      )
    })

    it('should return generic error when no custom default provided', () => {
      expect(getErrorMessage('Random error message')).toBe(
        'api.error-messages.generic'
      )
    })
  })

  describe('isKnownError', () => {
    it('should return true for known error messages', () => {
      expect(isKnownError('Invalid credentials')).toBe(true)
      expect(isKnownError('Unauthorized')).toBe(true)
      expect(isKnownError('Resource not found')).toBe(true)
    })

    it('should return true for i18n key values', () => {
      expect(isKnownError('auth.invalid-credentials')).toBe(true)
      expect(isKnownError('api.error-messages.not-found')).toBe(true)
    })

    it('should return false for unknown error messages', () => {
      expect(isKnownError('Some random error')).toBe(false)
      expect(isKnownError('Not a known error')).toBe(false)
    })

    it('should handle empty strings', () => {
      expect(isKnownError('')).toBe(false)
    })
  })
})
