import { describe, it, expect } from 'vitest'
import { addFilterParam } from './url-utils'

describe('url-utils', () => {
  describe('addFilterParam', () => {
    it('should add string parameter to URL', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'name', 'test')

      expect(url.searchParams.get('name')).toBe('test')
    })

    it('should add number parameter to URL', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'count', 42)

      expect(url.searchParams.get('count')).toBe('42')
    })

    it('should add boolean parameter to URL', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'active', true)

      expect(url.searchParams.get('active')).toBe('true')
    })

    it('should not add parameter when value is undefined', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'optional', undefined)

      expect(url.searchParams.has('optional')).toBe(false)
    })

    it('should add false boolean parameter', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'active', false)

      expect(url.searchParams.get('active')).toBe('false')
    })

    it('should add zero number parameter', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'count', 0)

      expect(url.searchParams.get('count')).toBe('0')
    })

    it('should not add empty string parameter', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'name', '')

      expect(url.searchParams.has('name')).toBe(false)
    })

    it('should handle multiple parameters', () => {
      const url = new URL('https://example.com/api')
      addFilterParam(url, 'name', 'test')
      addFilterParam(url, 'count', 5)
      addFilterParam(url, 'active', true)
      addFilterParam(url, 'optional', undefined)

      expect(url.searchParams.get('name')).toBe('test')
      expect(url.searchParams.get('count')).toBe('5')
      expect(url.searchParams.get('active')).toBe('true')
      expect(url.searchParams.has('optional')).toBe(false)
    })
  })
})
