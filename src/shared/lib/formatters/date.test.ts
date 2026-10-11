import { describe, it, expect } from 'vitest'
import {
  formatDateForDisplay,
  formatDateToStandard,
  formatRelativeDateLabel,
  parseDateString
} from './date'

describe('Date formatters', () => {
  describe('formatDateForDisplay', () => {
    it('handles undefined', () => {
      // @ts-expect-error - undefined is not a valid input
      expect(formatDateForDisplay(undefined)).toBeUndefined()
    })

    it('formats valid dates', () => {
      expect(formatDateForDisplay('2025-10-24T00:00:00.000Z')).toBeTruthy()
      expect(formatDateForDisplay(new Date('2025-10-24'))).toBeTruthy()
    })

    it('returns undefined for invalid dates', () => {
      expect(formatDateForDisplay('invalid-date')).toBeUndefined()
      expect(formatDateForDisplay(new Date('invalid'))).toBeUndefined()
    })
  })

  describe('parseDateString', () => {
    it('handles undefined', () => {
      expect(parseDateString(undefined)).toBeUndefined()
    })

    it('handles valid Date objects', () => {
      const date = new Date('2025-10-24')
      expect(parseDateString(date)).toBe(date)
    })

    it('returns undefined for invalid Date objects', () => {
      expect(parseDateString(new Date('invalid'))).toBeUndefined()
    })

    it('parses date-only strings as local midnight', () => {
      const result = parseDateString('2000-04-05')
      expect(result?.getFullYear()).toBe(2000)
      expect(result?.getMonth()).toBe(3) // April is month 3
      expect(result?.getDate()).toBe(5)
    })

    it('parses date strings with time component', () => {
      const result = parseDateString('2025-10-24T14:30:00.000Z')
      expect(result).toBeInstanceOf(Date)
    })

    it('returns undefined for invalid strings', () => {
      expect(parseDateString('invalid-date')).toBeUndefined()
    })
  })

  describe('formatRelativeDateLabel', () => {
    it('returns Hoy for today', () => {
      expect(formatRelativeDateLabel(new Date())).toBe('Hoy')
    })
  })

  describe('formatDateToStandard', () => {
    it('handles undefined', () => {
      // @ts-expect-error - undefined is not a valid input
      expect(formatDateToStandard(undefined)).toBeUndefined()
    })

    it('formats to YYYY-MM-DD using UTC', () => {
      expect(formatDateToStandard('2025-10-24T00:00:00.000Z')).toBe(
        '2025-10-24'
      )
      expect(formatDateToStandard(new Date('2025-10-24'))).toBe('2025-10-24')
      expect(formatDateToStandard('2025-01-05T00:00:00.000Z')).toBe(
        '2025-01-05'
      )
    })

    it('returns undefined for invalid dates', () => {
      expect(formatDateToStandard('invalid-date')).toBeUndefined()
      expect(formatDateToStandard(new Date('invalid'))).toBeUndefined()
    })
  })
})
