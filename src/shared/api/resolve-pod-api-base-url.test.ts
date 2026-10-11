import { describe, expect, it } from 'vitest'
import { resolvePodApiBaseUrl } from './resolve-pod-api-base-url'

describe('resolvePodApiBaseUrl', () => {
  it('appends /v1 when missing', () => {
    expect(resolvePodApiBaseUrl('http://localhost:5468')).toBe(
      'http://localhost:5468/v1'
    )
  })

  it('keeps url that already ends with /v1', () => {
    expect(resolvePodApiBaseUrl('http://localhost:5468/v1')).toBe(
      'http://localhost:5468/v1'
    )
  })

  it('trims trailing slash before appending /v1', () => {
    expect(resolvePodApiBaseUrl('http://localhost:5468/')).toBe(
      'http://localhost:5468/v1'
    )
  })
})
