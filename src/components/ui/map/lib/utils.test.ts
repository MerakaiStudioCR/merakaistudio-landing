import { describe, it, expect } from 'vitest'
import { buildStaticMapUrl } from './utils'

describe('buildStaticMapUrl', () => {
  const apiKey = 'test-api-key'

  it('should build correct URL with all parameters', () => {
    const url = buildStaticMapUrl(10.0162, -84.2142, 15, apiKey)

    expect(url).toContain('https://maps.googleapis.com/maps/api/staticmap')
    expect(url).toContain('center=10.0162%2C-84.2142')
    expect(url).toContain('zoom=15')
    expect(url).toContain('size=640x400')
    expect(url).toContain('scale=2')
    expect(url).toContain('maptype=roadmap')
    expect(url).toContain('markers=color%3Ared%7C10.0162%2C-84.2142')
    expect(url).toContain(`key=${apiKey}`)
  })

  it('should handle different zoom levels', () => {
    const url = buildStaticMapUrl(10.0, -84.0, 20, apiKey)
    expect(url).toContain('zoom=20')
  })

  it('should handle negative coordinates', () => {
    const url = buildStaticMapUrl(-33.8688, 151.2093, 12, apiKey)
    expect(url).toContain('center=-33.8688%2C151.2093')
    expect(url).toContain('markers=color%3Ared%7C-33.8688%2C151.2093')
  })

  it('should handle decimal precision', () => {
    const url = buildStaticMapUrl(10.123456, -84.654321, 10, apiKey)
    expect(url).toContain('center=10.123456%2C-84.654321')
  })
})
