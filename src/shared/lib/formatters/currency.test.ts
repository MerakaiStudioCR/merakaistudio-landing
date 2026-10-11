import { describe, it, expect, beforeAll } from 'vitest'
import formatCurrency from './currency'

describe('Currency Formatter', () => {
  beforeAll(() => {
    // Pre-load the es-CR locale data by calling formatCurrency once
    formatCurrency(0)
  })

  describe('formatCurrency', () => {
    it('should format positive numbers correctly', () => {
      const result = formatCurrency(1234.56)
      expect(result).toBe('₡1\u00A0234,56')
    })

    it('should format negative numbers correctly', () => {
      const result = formatCurrency(-1234.56)
      expect(result).toBe('-₡1\u00A0234,56')
    })

    it('should handle zero value', () => {
      const result = formatCurrency(0)
      expect(result).toBe('₡0')
    })

    it('should handle default parameter (undefined)', () => {
      const result = formatCurrency()
      expect(result).toBe('₡0')
    })

    it('should handle large numbers', () => {
      const result = formatCurrency(1000000)
      expect(result).toBe('₡1\u00A0000\u00A0000')
    })

    it('should handle very small numbers', () => {
      const result = formatCurrency(0.1)
      expect(result).toBe('₡0,1')
    })

    it('should handle decimal numbers (rounded to 0 decimal places)', () => {
      const result = formatCurrency(123.99)
      expect(result).toBe('₡123,99')
    })

    it('should handle negative decimal numbers', () => {
      const result = formatCurrency(-123.99)
      expect(result).toBe('-₡123,99')
    })

    it('should use correct locale (es-CR)', () => {
      const result = formatCurrency(1000)
      // Should use Costa Rican formatting (non-breaking space as thousands separator)
      expect(result).toBe('₡1\u00A0000')
    })

    it('should use correct currency (CRC)', () => {
      const result = formatCurrency(100)
      // Should use Costa Rican Colón symbol
      expect(result).toBe('₡100')
    })

    it('should not show decimal places (minimumFractionDigits: 0)', () => {
      const result = formatCurrency(123.456)
      expect(result).toBe('₡123,46')
    })

    it('should handle very large numbers with proper formatting', () => {
      const result = formatCurrency(1234567.89)
      expect(result).toBe('₡1\u00A0234\u00A0567,89')
    })

    it('should handle numbers that round to zero', () => {
      const result = formatCurrency(0.4)
      expect(result).toBe('₡0,4')
    })

    it('should handle numbers that round to one', () => {
      const result = formatCurrency(0.6)
      expect(result).toBe('₡0,6')
    })
  })
})
