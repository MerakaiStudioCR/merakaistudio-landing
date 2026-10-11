import { describe, it, expect } from 'vitest'
import {
  transformFormDataToState,
  getManagedQueryKeys
} from './form-transformer'
import type { FiltersConfig } from '../types'

describe('form-transformer', () => {
  describe('transformFormDataToState', () => {
    it('should handle text filter type', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' }
      ]
      const parsed = { search: 'test query' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ search: 'test query' })
    })

    it('should handle single-option filter type', () => {
      const filters: FiltersConfig = [
        { key: 'status', type: 'single-option', label: 'Status', options: [] }
      ]
      const parsed = { status: 'active' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ status: 'active' })
    })

    it('should handle multi-option filter type with comma-separated values', () => {
      const filters: FiltersConfig = [
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] }
      ]
      const parsed = { tags: 'tag1,tag2,tag3' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ tags: ['tag1', 'tag2', 'tag3'] })
    })

    it('should handle multi-option filter type with empty string', () => {
      const filters: FiltersConfig = [
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] }
      ]
      const parsed = { tags: '' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ tags: undefined })
    })

    it('should filter out empty values in multi-option', () => {
      const filters: FiltersConfig = [
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] }
      ]
      const parsed = { tags: 'tag1,,tag2,,,tag3' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ tags: ['tag1', 'tag2', 'tag3'] })
    })

    it('should handle multi-option with undefined value', () => {
      const filters: FiltersConfig = [
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] }
      ]
      const parsed = {}

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ tags: undefined })
    })

    it('should handle multi-option with value that converts to empty string', () => {
      const filters: FiltersConfig = [
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] }
      ]
      // Object with toString that returns empty string
      const emptyStringObj = { toString: () => '' }
      const parsed = { tags: emptyStringObj }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ tags: [] })
    })

    it('should handle boolean filter type', () => {
      const filters: FiltersConfig = [
        { key: 'active', type: 'boolean', label: 'Active' }
      ]
      const parsed = { active: true }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ active: true })
    })

    it('should convert truthy values to boolean', () => {
      const filters: FiltersConfig = [
        { key: 'active', type: 'boolean', label: 'Active' }
      ]
      const parsed = { active: 'yes' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ active: true })
    })

    it('should handle date filter type', () => {
      const filters: FiltersConfig = [
        { key: 'createdAt', type: 'date', label: 'Created At' }
      ]
      const parsed = { createdAt: '2023-10-15' }

      const result = transformFormDataToState(filters, parsed)

      expect(result.createdAt).toBeInstanceOf(Date)
      expect((result.createdAt as Date).toISOString()).toContain('2023-10-15')
    })

    it('should handle date-range filter type with both start and end', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]
      const parsed = {
        dateRange_from: '2023-10-01',
        dateRange_to: '2023-10-31'
      }

      const result = transformFormDataToState(filters, parsed)

      expect(result.dateRange).toBeDefined()
      const dateRange = result.dateRange as { start?: Date; end?: Date }
      expect(dateRange.start).toBeInstanceOf(Date)
      expect(dateRange.end).toBeInstanceOf(Date)
      expect(dateRange.start?.toISOString()).toContain('2023-10-01')
      expect(dateRange.end?.toISOString()).toContain('2023-10-31')
    })

    it('should handle date-range filter type with only start date', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]
      const parsed = {
        dateRange_from: '2023-10-01'
      }

      const result = transformFormDataToState(filters, parsed)

      expect(result.dateRange).toBeDefined()
      const dateRange = result.dateRange as { start?: Date; end?: Date }
      expect(dateRange.start).toBeInstanceOf(Date)
      expect(dateRange.end).toBeUndefined()
    })

    it('should handle date-range filter type with only end date', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]
      const parsed = {
        dateRange_to: '2023-10-31'
      }

      const result = transformFormDataToState(filters, parsed)

      expect(result.dateRange).toBeDefined()
      const dateRange = result.dateRange as { start?: Date; end?: Date }
      expect(dateRange.start).toBeUndefined()
      expect(dateRange.end).toBeInstanceOf(Date)
    })

    it('should handle date-range filter type with no dates', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]
      const parsed = {}

      const result = transformFormDataToState(filters, parsed)

      expect(result.dateRange).toBeDefined()
      const dateRange = result.dateRange as { start?: Date; end?: Date }
      expect(dateRange.start).toBeUndefined()
      expect(dateRange.end).toBeUndefined()
    })

    it('should set undefined for missing text values', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' }
      ]
      const parsed = {}

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ search: undefined })
    })

    it('should set undefined for null text values', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' }
      ]
      const parsed = { search: null }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ search: undefined })
    })

    it('should set undefined for empty string text values', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' }
      ]
      const parsed = { search: '' }

      const result = transformFormDataToState(filters, parsed)

      expect(result).toEqual({ search: undefined })
    })

    it('should not set undefined for date-range when values are missing', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]
      const parsed = { dateRange: '' }

      const result = transformFormDataToState(filters, parsed)

      // Date-range should still be processed even with empty main key
      expect(result.dateRange).toBeDefined()
    })

    it('should handle multiple filters of different types', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' },
        { key: 'status', type: 'single-option', label: 'Status', options: [] },
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] },
        { key: 'active', type: 'boolean', label: 'Active' },
        { key: 'createdAt', type: 'date', label: 'Created At' },
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]
      const parsed = {
        search: 'test',
        status: 'active',
        tags: 'tag1,tag2',
        active: true,
        createdAt: '2023-10-15',
        dateRange_from: '2023-10-01',
        dateRange_to: '2023-10-31'
      }

      const result = transformFormDataToState(filters, parsed)

      expect(result.search).toBe('test')
      expect(result.status).toBe('active')
      expect(result.tags).toEqual(['tag1', 'tag2'])
      expect(result.active).toBe(true)
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.dateRange).toBeDefined()
    })

    it('should handle unknown filter type gracefully', () => {
      const filters: FiltersConfig = [
        // biome-ignore lint/suspicious/noExplicitAny: Test unknown filter type
        { key: 'unknown', type: 'unknown-type' as any, label: 'Unknown' }
      ]
      const parsed = { unknown: 'value' }

      const result = transformFormDataToState(filters, parsed)

      // Unknown types should be ignored (not processed)
      expect(result.unknown).toBeUndefined()
    })
  })

  describe('getManagedQueryKeys', () => {
    it('should return keys for simple filter types', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' },
        { key: 'status', type: 'single-option', label: 'Status', options: [] }
      ]

      const result = getManagedQueryKeys(filters)

      expect(result).toEqual(['search', 'status'])
    })

    it('should return expanded keys for date-range filters', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]

      const result = getManagedQueryKeys(filters)

      expect(result).toEqual(['dateRange', 'dateRange_from', 'dateRange_to'])
    })

    it('should handle mixed filter types including date-range', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' },
        { key: 'dateRange', type: 'date-range', label: 'Date Range' },
        { key: 'status', type: 'single-option', label: 'Status', options: [] }
      ]

      const result = getManagedQueryKeys(filters)

      expect(result).toEqual([
        'search',
        'dateRange',
        'dateRange_from',
        'dateRange_to',
        'status'
      ])
    })

    it('should handle multiple date-range filters', () => {
      const filters: FiltersConfig = [
        { key: 'createdRange', type: 'date-range', label: 'Created Range' },
        { key: 'updatedRange', type: 'date-range', label: 'Updated Range' }
      ]

      const result = getManagedQueryKeys(filters)

      expect(result).toEqual([
        'createdRange',
        'createdRange_from',
        'createdRange_to',
        'updatedRange',
        'updatedRange_from',
        'updatedRange_to'
      ])
    })

    it('should return empty array for empty filters config', () => {
      const filters: FiltersConfig = []

      const result = getManagedQueryKeys(filters)

      expect(result).toEqual([])
    })

    it('should handle all filter types', () => {
      const filters: FiltersConfig = [
        { key: 'text', type: 'text', label: 'Text' },
        { key: 'date', type: 'date', label: 'Date' },
        { key: 'range', type: 'date-range', label: 'Range' },
        { key: 'single', type: 'single-option', label: 'Single', options: [] },
        { key: 'multi', type: 'multi-option', label: 'Multi', options: [] },
        { key: 'bool', type: 'boolean', label: 'Boolean' }
      ]

      const result = getManagedQueryKeys(filters)

      expect(result).toEqual([
        'text',
        'date',
        'range',
        'range_from',
        'range_to',
        'single',
        'multi',
        'bool'
      ])
    })
  })
})
