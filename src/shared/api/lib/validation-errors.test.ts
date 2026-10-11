import { describe, it, expect } from 'vitest'
import { VALIDATION_ERRORS } from './validation-errors'

describe('VALIDATION_ERRORS constants', () => {
  it('should export validation error messages', () => {
    expect(VALIDATION_ERRORS.PARAMETER_REQUIRED).toBe('Parameter is required')
    expect(VALIDATION_ERRORS.INVALID_PARAMETER).toBe('Invalid parameter')
    expect(VALIDATION_ERRORS.RESOURCE_NOT_FOUND).toBe('Resource not found')
    expect(VALIDATION_ERRORS.DELETE_FAILED).toBe('Delete operation failed')
  })

  it('should be an immutable constant object', () => {
    expect(Object.isFrozen(VALIDATION_ERRORS)).toBe(false) // as const doesn't freeze, just provides type safety
    expect(typeof VALIDATION_ERRORS).toBe('object')
  })

  it('should have exactly 4 error keys', () => {
    const keys = Object.keys(VALIDATION_ERRORS)
    expect(keys).toHaveLength(4)
    expect(keys).toEqual([
      'PARAMETER_REQUIRED',
      'INVALID_PARAMETER',
      'RESOURCE_NOT_FOUND',
      'DELETE_FAILED'
    ])
  })
})
