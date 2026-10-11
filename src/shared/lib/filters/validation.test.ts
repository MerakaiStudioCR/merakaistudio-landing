import { describe, it, expect } from 'vitest'
import { validateSelectValue } from './validation'

describe('validateSelectValue', () => {
  describe('valid values', () => {
    it('should return string value when valid', () => {
      expect(validateSelectValue('active')).toBe('active')
    })

    it('should trim whitespace from valid values', () => {
      expect(validateSelectValue('  active  ')).toBe('active')
    })

    it('should return numeric strings as valid', () => {
      expect(validateSelectValue('123')).toBe('123')
    })

    it('should return special characters as valid', () => {
      expect(validateSelectValue('some-value_123')).toBe('some-value_123')
    })
  })

  describe('invalid values', () => {
    it('should return undefined for "all" value', () => {
      expect(validateSelectValue('all')).toBeUndefined()
    })

    it('should return undefined for empty string', () => {
      expect(validateSelectValue('')).toBeUndefined()
    })

    it('should return undefined for whitespace-only string', () => {
      expect(validateSelectValue('   ')).toBeUndefined()
    })

    it('should return undefined for non-string values', () => {
      expect(validateSelectValue(123)).toBeUndefined()
      expect(validateSelectValue(null)).toBeUndefined()
      expect(validateSelectValue(undefined)).toBeUndefined()
      expect(validateSelectValue(true)).toBeUndefined()
      expect(validateSelectValue(false)).toBeUndefined()
    })

    it('should return undefined for objects', () => {
      expect(validateSelectValue({})).toBeUndefined()
      expect(validateSelectValue({ value: 'test' })).toBeUndefined()
    })

    it('should return undefined for arrays', () => {
      expect(validateSelectValue([])).toBeUndefined()
      expect(validateSelectValue(['value'])).toBeUndefined()
    })
  })

  describe('edge cases', () => {
    it('should handle single character strings', () => {
      expect(validateSelectValue('a')).toBe('a')
    })

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000)
      expect(validateSelectValue(longString)).toBe(longString)
    })

    it('should handle strings with only whitespace in middle', () => {
      expect(validateSelectValue('value with spaces')).toBe('value with spaces')
    })

    it('should handle tabs and newlines', () => {
      expect(validateSelectValue('\tvalue\n')).toBe('value')
    })
  })
})
