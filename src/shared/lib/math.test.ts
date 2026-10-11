import { describe, it, expect } from 'vitest'
import { calculateAverage, roundToDecimals, parseNumber } from './math'

describe('Math Utils', () => {
  describe('calculateAverage', () => {
    it('should calculate correct average for normal array', () => {
      const numbers = [1, 2, 3, 4, 5]
      const result = calculateAverage(numbers)
      expect(result).toBe(3)
    })

    it('should return 0 for empty array', () => {
      const numbers: number[] = []
      const result = calculateAverage(numbers)
      expect(result).toBe(0)
    })

    it('should handle single number', () => {
      const numbers = [42]
      const result = calculateAverage(numbers)
      expect(result).toBe(42)
    })

    it('should handle negative numbers', () => {
      const numbers = [-1, -2, -3, -4, -5]
      const result = calculateAverage(numbers)
      expect(result).toBe(-3)
    })

    it('should handle decimal numbers', () => {
      const numbers = [1.5, 2.5, 3.5]
      const result = calculateAverage(numbers)
      expect(result).toBe(2.5)
    })
  })

  describe('roundToDecimals', () => {
    it('should round to specified decimal places', () => {
      const result = roundToDecimals(Math.PI, 2)
      expect(result).toBe(3.14)
    })

    it('should use default 2 decimal places when not specified', () => {
      const result = roundToDecimals(Math.PI)
      expect(result).toBe(3.14)
    })

    it('should round to 0 decimal places', () => {
      const result = roundToDecimals(3.7, 0)
      expect(result).toBe(4)
    })

    it('should handle negative numbers', () => {
      const result = roundToDecimals(-Math.PI, 2)
      expect(result).toBe(-3.14)
    })

    it('should handle zero', () => {
      const result = roundToDecimals(0, 2)
      expect(result).toBe(0)
    })

    it('should handle numbers that need rounding up', () => {
      const result = roundToDecimals(3.145, 2)
      expect(result).toBe(3.15)
    })

    it('should handle numbers that need rounding down', () => {
      const result = roundToDecimals(3.144, 2)
      expect(result).toBe(3.14)
    })
  })

  describe('parseNumber', () => {
    describe('string inputs', () => {
      it('should parse valid numeric string', () => {
        const result = parseNumber('42')
        expect(result).toBe(42)
      })

      it('should parse negative numeric string', () => {
        const result = parseNumber('-42')
        expect(result).toBe(-42)
      })

      it('should parse string with leading/trailing whitespace', () => {
        const result = parseNumber('  42  ')
        expect(result).toBe(42)
      })

      it('should parse zero string', () => {
        const result = parseNumber('0')
        expect(result).toBe(0)
      })

      it('should return defaultValue for empty string', () => {
        const result = parseNumber('', 99)
        expect(result).toBe(99)
      })

      it('should return undefined for empty string without defaultValue', () => {
        const result = parseNumber('')
        expect(result).toBeUndefined()
      })

      it('should return defaultValue for invalid string', () => {
        const result = parseNumber('abc', 99)
        expect(result).toBe(99)
      })

      it('should return undefined for invalid string without defaultValue', () => {
        const result = parseNumber('abc')
        expect(result).toBeUndefined()
      })
    })

    describe('number inputs', () => {
      it('should return finite number as-is', () => {
        const result = parseNumber(42)
        expect(result).toBe(42)
      })

      it('should return zero as-is', () => {
        const result = parseNumber(0)
        expect(result).toBe(0)
      })

      it('should return defaultValue for NaN', () => {
        const result = parseNumber(Number.NaN, 99)
        expect(result).toBe(99)
      })

      it('should return undefined for NaN without defaultValue', () => {
        const result = parseNumber(Number.NaN)
        expect(result).toBeUndefined()
      })

      it('should return defaultValue for Infinity', () => {
        const result = parseNumber(Number.POSITIVE_INFINITY, 100)
        expect(result).toBe(100)
      })

      it('should return undefined for Infinity without defaultValue', () => {
        const result = parseNumber(Number.POSITIVE_INFINITY)
        expect(result).toBeUndefined()
      })
    })

    describe('other types', () => {
      it('should return defaultValue for null', () => {
        const result = parseNumber(null, 50)
        expect(result).toBe(50)
      })

      it('should return undefined for null without defaultValue', () => {
        const result = parseNumber(null)
        expect(result).toBeUndefined()
      })

      it('should return defaultValue for undefined', () => {
        const result = parseNumber(undefined, 75)
        expect(result).toBe(75)
      })

      it('should return undefined for undefined without defaultValue', () => {
        const result = parseNumber(undefined)
        expect(result).toBeUndefined()
      })

      it('should return defaultValue for non-numeric types', () => {
        expect(parseNumber(true, 100)).toBe(100)
        expect(parseNumber({}, 200)).toBe(200)
        expect(parseNumber([1, 2, 3], 300)).toBe(300)
      })
    })

    describe('edge cases with defaultValue', () => {
      it('should handle defaultValue of 0', () => {
        const result = parseNumber('invalid', 0)
        expect(result).toBe(0)
      })
    })
  })
})
