import { describe, it, expect } from 'vitest'
import { safeInitialDate, formatSingleDate, formatRangeDate } from './utils'
import type { RangeValue } from './types'

describe('DatePicker utils', () => {
  describe('safeInitialDate', () => {
    it('returns undefined for invalid date strings', () => {
      expect(safeInitialDate('invalid-date')).toBeUndefined()
    })

    it('returns undefined for undefined', () => {
      expect(safeInitialDate(undefined)).toBeUndefined()
    })

    it('returns a valid Date for ISO string', () => {
      const d = safeInitialDate('2024-01-02')
      expect(d).toBeInstanceOf(Date)
      expect(d?.toISOString().slice(0, 10)).toBe('2024-01-02')
    })

    it('returns the same Date instance if valid', () => {
      const input = new Date('2024-05-01')
      const out = safeInitialDate(input)
      expect(out).toBe(input)
    })

    it('returns undefined for invalid Date instance', () => {
      const invalid = new Date('')
      expect(safeInitialDate(invalid)).toBeUndefined()
    })

    it('returns undefined for empty string', () => {
      expect(safeInitialDate('')).toBeUndefined()
    })
  })

  describe('formatSingleDate', () => {
    it('returns undefined when no date', () => {
      expect(formatSingleDate(undefined)).toBeUndefined()
    })

    it('formats a single date with locale', () => {
      const out = formatSingleDate(new Date('2024-03-15T00:00:00.000Z'))
      expect(typeof out).toBe('string')
      expect(out).toBeTruthy()
    })
  })

  describe('formatRangeDate', () => {
    it('returns undefined when no range', () => {
      expect(formatRangeDate(undefined)).toBeUndefined()
    })

    it('returns undefined when both dates missing', () => {
      expect(formatRangeDate({} as RangeValue)).toBeUndefined()
    })

    it('formats only start date when end missing', () => {
      const out = formatRangeDate({ start: new Date('2024-01-01') })
      expect(out).toContain(' - ...')
    })

    it('formats only end date when start missing', () => {
      const out = formatRangeDate({ end: new Date('2024-01-10') })
      expect(out?.startsWith('... - ')).toBe(true)
    })

    it('formats full range when both present', () => {
      const out = formatRangeDate({
        start: new Date('2024-01-01'),
        end: new Date('2024-01-10')
      })
      expect(out).toContain(' - ')
    })
  })
})
