import { describe, it, expect } from 'vitest'
import {
  dateToIsoDate,
  parseFiltersFromUrl,
  serializeFiltersToUrl
} from './url-serialization'
import type { FiltersConfig } from '../types'

describe('filters/utils', () => {
  describe('dateToIsoDate', () => {
    it('should return formatted date string (YYYY-MM-DD)', () => {
      const d = new Date('2024-01-02T05:00:00.000Z')
      expect(dateToIsoDate(d)).toBe('2024-01-02')
    })
    it('should return empty string if arg is undefined', () => {
      expect(dateToIsoDate(undefined)).toBe('')
    })
  })

  describe('parseFromUrl and serialize', () => {
    const config: FiltersConfig = [
      { key: 'fruit', type: 'text', label: 'Fruit' },
      { key: 'landing', type: 'single-option', label: 'Landing' },
      { key: 'multiple', type: 'multi-option', label: 'Multi' },
      { key: 'active', type: 'boolean', label: 'Active' },
      { key: 'date', type: 'date', label: 'Date' },
      { key: 'dater', type: 'date-range', label: 'Range' },
      // @ts-expect-error: Force hitting default branch with unsupported type
      { key: 'noop', type: 'unsupported', label: 'Noop' }
    ]
    const dateStr = '2024-05-17'
    const dateObj = new Date(dateStr)
    const rangeStart = '2024-04-01'
    const rangeEnd = '2024-04-10'

    it('parses all supported types from URLSearchParams', () => {
      const params = new URLSearchParams({
        fruit: 'apple',
        landing: 'L123',
        multiple: 'a,b,c',
        active: 'true',
        date: dateStr,
        dater_from: rangeStart,
        dater_to: rangeEnd,
        noop: 'ignored'
      })
      const state = parseFiltersFromUrl(config, params)
      expect(state.fruit).toBe('apple')
      expect(state.landing).toBe('L123')
      expect(Array.isArray(state.multiple)).toBe(true)
      expect(state.multiple).toEqual(['a', 'b', 'c'])
      expect(state.active).toBe(true)
      expect(state.date instanceof Date).toBe(true)
      expect((state.date as Date).toISOString().slice(0, 10)).toBe(dateStr)
      // Compare as ISO date strings to avoid timezone issues
      const dater = state.dater as { start?: Date; end?: Date }
      expect(dater.start instanceof Date).toBe(true)
      expect(dater.end instanceof Date).toBe(true)
      expect(dater.start?.toISOString().slice(0, 10)).toBe(rangeStart)
      expect(dater.end?.toISOString().slice(0, 10)).toBe(rangeEnd)
      // unsupported type is ignored and remains undefined
      expect(state.noop).toBeUndefined()
    })

    it('handles missing or empty params', () => {
      const params = new URLSearchParams()
      const state = parseFiltersFromUrl(config, params)
      expect(state.fruit).toBeUndefined()
      expect(state.landing).toBeUndefined()
      expect(state.multiple).toEqual([])
      expect(state.active).toBeUndefined()
      expect(state.date).toBeUndefined()
      expect(state.dater).toMatchObject({ start: undefined, end: undefined })
    })

    it('applies initialValue when URL param is missing', () => {
      const configWithDefaults: FiltersConfig = [
        {
          key: 'status',
          type: 'single-option',
          label: 'Status',
          initialValue: 'ACTIVE'
        },
        {
          key: 'search',
          type: 'text',
          label: 'Search',
          initialValue: 'default-search'
        }
      ]
      const state = parseFiltersFromUrl(
        configWithDefaults,
        new URLSearchParams()
      )
      expect(state.status).toBe('ACTIVE')
      expect(state.search).toBe('default-search')

      const fromUrl = parseFiltersFromUrl(
        configWithDefaults,
        new URLSearchParams({ status: 'PENDING' })
      )
      expect(fromUrl.status).toBe('PENDING')
    })

    it('handles boolean params', () => {
      const params = new URLSearchParams({ active: 'false' })
      const state = parseFiltersFromUrl(config, params)
      expect(state.active).toBe(false)
    })

    it('serializes all supported types into query params and ignores unsupported', () => {
      const filterState = {
        fruit: 'mango',
        landing: 'L999',
        multiple: ['x', 'y', 'z'],
        active: false,
        date: dateObj,
        dater: { start: new Date(rangeStart), end: new Date(rangeEnd) },
        // Force unknown type value
        noop: 'value'
      }
      const out = serializeFiltersToUrl(config, filterState)
      expect(out.fruit).toBe('mango')
      expect(out.landing).toBe('L999')
      expect(out.multiple).toBe('x,y,z')
      expect(out.active).toBe('false')
      expect(out.date).toBe(dateStr)
      expect(out.dater_from).toBe(rangeStart)
      expect(out.dater_to).toBe(rangeEnd)
      // unsupported type is not serialized
      expect(out.noop).toBeUndefined()
    })

    it('omits empty, undefined, or empty array fields in serialize()', () => {
      const state = {
        fruit: '',
        landing: undefined,
        multiple: [],
        active: undefined,
        date: undefined,
        dater: { start: undefined, end: undefined }
      }
      const out = serializeFiltersToUrl(config, state)
      expect(Object.keys(out).length).toBe(0)
    })

    it('omits single-option filter with value "all"', () => {
      const state = {
        landing: 'all',
        fruit: 'apple'
      }
      const out = serializeFiltersToUrl(config, state)
      expect(out.landing).toBeUndefined()
      expect(out.fruit).toBe('apple')
    })
  })
})
