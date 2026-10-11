import { describe, expect, it } from 'vitest'
import {
  countAppliedFilters,
  isAppliedFilterValue
} from './count-applied-filters'
import type { FilterConfig } from '../types'

describe('isAppliedFilterValue', () => {
  it('ignores empty and all-option values', () => {
    expect(isAppliedFilterValue(undefined)).toBe(false)
    expect(isAppliedFilterValue('')).toBe(false)
    expect(isAppliedFilterValue('all')).toBe(false)
    expect(isAppliedFilterValue([])).toBe(false)
    expect(isAppliedFilterValue({ start: undefined, end: undefined })).toBe(
      false
    )
  })

  it('counts concrete filter values', () => {
    expect(isAppliedFilterValue('Ultrasónico')).toBe(true)
    expect(isAppliedFilterValue(['a'])).toBe(true)
    expect(isAppliedFilterValue(true)).toBe(true)
    expect(isAppliedFilterValue({ start: new Date('2026-01-01') })).toBe(true)
  })
})

describe('countAppliedFilters', () => {
  const configs = [
    { key: 'q', type: 'text', label: 'Search' },
    { key: 'statusId', type: 'single-option', label: 'Status' },
    { key: 'createdFrom', type: 'date', label: 'From' }
  ] as FilterConfig[]

  it('counts only applied filters', () => {
    expect(
      countAppliedFilters(configs, {
        q: 'paja',
        statusId: 'all',
        createdFrom: undefined
      })
    ).toBe(1)
  })
})
