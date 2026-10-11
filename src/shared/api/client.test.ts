import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from './client'
import authInterceptor from './interceptors/auth.interceptor'
import contentTypeInterceptor from './interceptors/content-type.interceptor'
import jsonInterceptor from './interceptors/json.interceptor'

// Mock interceptors
vi.mock('./interceptors/auth.interceptor', () => ({
  default: vi.fn((options) => Promise.resolve(options))
}))

vi.mock('./interceptors/content-type.interceptor', () => ({
  default: vi.fn((options) => options)
}))

vi.mock('./interceptors/json.interceptor', () => ({
  default: vi.fn(async (response) => response)
}))

// Mock global fetch
global.fetch = vi.fn()

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('request', () => {
    it('should apply request interceptors in order', async () => {
      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      await apiClient.request('http://localhost:3000/api/test', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      // Verify interceptors were called in the correct order
      const contentTypeCallOrder = vi.mocked(contentTypeInterceptor).mock
        .invocationCallOrder[0]
      const authCallOrder =
        vi.mocked(authInterceptor).mock.invocationCallOrder[0]

      expect(contentTypeCallOrder).toBeLessThan(authCallOrder)
      expect(authInterceptor).toHaveBeenCalled()
    })

    it('should make fetch request with modified options from interceptors', async () => {
      const modifiedOptions = {
        url: 'http://localhost:3000/api/test',
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' })
      }
      vi.mocked(authInterceptor).mockResolvedValue(modifiedOptions)

      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      await apiClient.request('http://localhost:3000/api/test', {
        method: 'POST'
      })

      expect(global.fetch).toHaveBeenCalledWith(
        modifiedOptions.url,
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Headers)
        })
      )
    })

    it('should apply response interceptors', async () => {
      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)
      vi.mocked(jsonInterceptor).mockResolvedValue(mockResponse)

      await apiClient.request('http://localhost:3000/api/test')

      expect(jsonInterceptor).toHaveBeenCalledWith(mockResponse)
    })

    it('should return response from interceptors', async () => {
      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' }
      })
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      const interceptedResponse = { intercepted: true } as any

      vi.mocked(global.fetch).mockResolvedValue(mockResponse)
      vi.mocked(jsonInterceptor).mockResolvedValue(
        interceptedResponse as unknown as Response
      )

      const result = await apiClient.request('http://localhost:3000/api/test')

      expect(result).toBe(interceptedResponse)
    })

    it('should propagate interceptor errors', async () => {
      const interceptorError = new Error('Interceptor failed')
      vi.mocked(authInterceptor).mockRejectedValue(interceptorError)

      await expect(
        apiClient.request('http://localhost:3000/api/test')
      ).rejects.toThrow('Interceptor failed')
    })

    it('should handle multiple request interceptors modifying options', async () => {
      vi.mocked(contentTypeInterceptor).mockImplementation((options) => ({
        ...options,
        headers: new Headers({ 'Content-Type': 'application/json' })
      }))

      vi.mocked(authInterceptor).mockImplementation(async (options) => {
        const headers = new Headers(options.headers)
        headers.set('Authorization', 'Bearer token123')
        return { ...options, headers }
      })

      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      await apiClient.request('http://localhost:3000/api/test', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const fetchCall = vi.mocked(global.fetch).mock.calls[0]
      const fetchOptions = fetchCall[1] as RequestInit
      const headers = fetchOptions.headers as Headers

      expect(headers.get('Content-Type')).toBe('application/json')
      expect(headers.get('Authorization')).toBe('Bearer token123')
    })
  })

  describe('error handling', () => {
    it('should propagate fetch errors', async () => {
      const networkError = new Error('Network failure')
      vi.mocked(global.fetch).mockRejectedValue(networkError)

      await expect(
        apiClient.request('http://localhost:3000/api/test')
      ).rejects.toThrow('Network failure')
    })

    it('should propagate response interceptor errors', async () => {
      const mockResponse = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      const interceptorError = new Error('Response processing failed')
      vi.mocked(jsonInterceptor).mockRejectedValue(interceptorError)

      await expect(
        apiClient.request('http://localhost:3000/api/test')
      ).rejects.toThrow('Response processing failed')
    })

    it('should handle fetch timeout errors', async () => {
      const timeoutError = new Error('Request timeout')
      timeoutError.name = 'AbortError'
      vi.mocked(global.fetch).mockRejectedValue(timeoutError)

      await expect(
        apiClient.request('http://localhost:3000/api/test')
      ).rejects.toThrow('Request timeout')
    })
  })
})
