import { describe, expect, it } from 'vitest'
import { isStaleChunkError } from './is-stale-chunk-error'

describe('isStaleChunkError', () => {
  it('detects ChunkLoadError by name', () => {
    const error = new Error(
      'Failed to load chunk /_next/static/chunks/_13564c7f._.js'
    )
    error.name = 'ChunkLoadError'

    expect(isStaleChunkError(error)).toBe(true)
  })

  it('detects webpack loading chunk failures', () => {
    expect(
      isStaleChunkError(new Error('Loading chunk 123 failed.\n(error: ...)'))
    ).toBe(true)
  })

  it('ignores unrelated errors', () => {
    expect(isStaleChunkError(new Error('Network request failed'))).toBe(false)
    expect(isStaleChunkError(null)).toBe(false)
  })
})
