import { describe, it, expect } from 'vitest'
import { getConfigForKey } from './payload-config'
import type { ChartConfig } from '../types'

describe('getConfigForKey', () => {
  it('returns config for existing key', () => {
    const config: ChartConfig = {
      visitors: { label: 'Visitors', color: '#8884d8' },
      revenue: { label: 'Revenue', color: '#82ca9d' }
    }

    expect(getConfigForKey(config, 'visitors')).toEqual({
      label: 'Visitors',
      color: '#8884d8'
    })
  })

  it('returns undefined for non-existent key', () => {
    const config: ChartConfig = {
      visitors: { label: 'Visitors', color: '#8884d8' }
    }

    expect(getConfigForKey(config, 'nonexistent')).toBeUndefined()
  })
})
