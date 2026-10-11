import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import authInterceptor from './auth.interceptor'
import type { RequestOptions } from '~/shared/api/types'

vi.mock('~/shared/lib/cookies/auth-cookie', () => ({
  getAuthCookie: vi.fn()
}))

import { getAuthCookie } from '~/shared/lib/cookies/auth-cookie'

describe('authInterceptor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should add Authorization header when token exists', async () => {
    const mockToken = 'test-token-123'
    vi.mocked(getAuthCookie).mockResolvedValueOnce(mockToken)

    const options: RequestOptions = {
      url: 'https://api.example.com/data',
      method: 'GET'
    }

    const result = await authInterceptor(options)

    expect(result.headers).toBeDefined()
    const headers = new Headers(result.headers)
    expect(headers.get('Authorization')).toBe(`Bearer ${mockToken}`)
  })

  it('should not add Authorization header when token is undefined', async () => {
    vi.mocked(getAuthCookie).mockResolvedValueOnce(undefined)

    const options: RequestOptions = {
      url: 'https://api.example.com/data',
      method: 'GET'
    }

    const result = await authInterceptor(options)

    expect(result).toEqual(options)
  })

  it('should preserve existing headers when adding Authorization', async () => {
    const mockToken = 'test-token-123'
    vi.mocked(getAuthCookie).mockResolvedValueOnce(mockToken)

    const existingHeaders = new Headers({
      'Content-Type': 'application/json',
      'X-Custom': 'custom-value'
    })

    const options: RequestOptions = {
      url: 'https://api.example.com/data',
      method: 'POST',
      headers: existingHeaders
    }

    const result = await authInterceptor(options)

    const headers = new Headers(result.headers)
    expect(headers.get('Authorization')).toBe(`Bearer ${mockToken}`)
    expect(headers.get('Content-Type')).toBe('application/json')
    expect(headers.get('X-Custom')).toBe('custom-value')
  })

  describe('request isolation', () => {
    it('should use the token from the current request', async () => {
      vi.mocked(getAuthCookie)
        .mockResolvedValueOnce('token-user-a')
        .mockResolvedValueOnce('token-user-b')

      const options: RequestOptions = {
        url: 'https://api.example.com/data',
        method: 'GET'
      }

      const result1 = await authInterceptor(options)
      const result2 = await authInterceptor(options)

      const headers1 = new Headers(result1.headers)
      const headers2 = new Headers(result2.headers)

      expect(headers1.get('Authorization')).toBe('Bearer token-user-a')
      expect(headers2.get('Authorization')).toBe('Bearer token-user-b')
      expect(getAuthCookie).toHaveBeenCalledTimes(2)
    })

    it('should read the cookie again when the previous token was missing', async () => {
      vi.mocked(getAuthCookie).mockResolvedValue(undefined)

      const options: RequestOptions = {
        url: 'https://api.example.com/data',
        method: 'GET'
      }

      await authInterceptor(options)
      expect(getAuthCookie).toHaveBeenCalledTimes(1)

      await authInterceptor(options)
      expect(getAuthCookie).toHaveBeenCalledTimes(2)
    })
  })

  describe('error handling', () => {
    it('should propagate error when getAuthCookie throws', async () => {
      const mockError = new Error('Cookie fetch failed')
      vi.mocked(getAuthCookie).mockRejectedValueOnce(mockError)

      const options: RequestOptions = {
        url: 'https://api.example.com/data',
        method: 'GET'
      }

      await expect(authInterceptor(options)).rejects.toThrow(
        'Cookie fetch failed'
      )
    })

    it('should read a new token after a cookie read fails', async () => {
      const mockError = new Error('First call fails')
      const mockToken = 'success-token'

      vi.mocked(getAuthCookie)
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(mockToken)

      const options: RequestOptions = {
        url: 'https://api.example.com/data',
        method: 'GET'
      }

      await expect(authInterceptor(options)).rejects.toThrow('First call fails')
      expect(getAuthCookie).toHaveBeenCalledTimes(1)

      const result = await authInterceptor(options)
      const headers = new Headers(result.headers)
      expect(headers.get('Authorization')).toBe(`Bearer ${mockToken}`)
      expect(getAuthCookie).toHaveBeenCalledTimes(2)
    })
  })

  describe('race conditions', () => {
    it('should handle concurrent requests before either cookie read settles', async () => {
      let resolveFirstCall: ((value: string) => void) | undefined
      let resolveSecondCall: ((value: string) => void) | undefined

      const slowToken1 = new Promise<string>((resolve) => {
        resolveFirstCall = resolve
      })
      const slowToken2 = new Promise<string>((resolve) => {
        resolveSecondCall = resolve
      })

      vi.mocked(getAuthCookie)
        .mockReturnValueOnce(slowToken1)
        .mockReturnValueOnce(slowToken2)

      const options1: RequestOptions = {
        url: 'https://api.example.com/data1',
        method: 'GET'
      }
      const options2: RequestOptions = {
        url: 'https://api.example.com/data2',
        method: 'GET'
      }

      const request1Promise = authInterceptor(options1)
      const request2Promise = authInterceptor(options2)

      expect(getAuthCookie).toHaveBeenCalledTimes(2)

      resolveFirstCall?.('token-1')
      resolveSecondCall?.('token-2')

      const [result1, result2] = await Promise.all([
        request1Promise,
        request2Promise
      ])

      const headers1 = new Headers(result1.headers)
      const headers2 = new Headers(result2.headers)

      expect(headers1.get('Authorization')).toBe('Bearer token-1')
      expect(headers2.get('Authorization')).toBe('Bearer token-2')
    })
  })
})
