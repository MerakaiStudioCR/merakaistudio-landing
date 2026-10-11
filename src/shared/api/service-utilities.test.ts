import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiServiceUtilities } from './service-utilities'

// Create a concrete implementation for testing
class TestApiService extends ApiServiceUtilities {
  async testRequest(endpoint: string, options?: RequestInit) {
    return this.request(endpoint, options)
  }

  testBuildUrl(path: string, params?: Record<string, string>) {
    return this.buildUrl(path, params)
  }
}

// Mock global fetch
global.fetch = vi.fn()

// Mock window.location for URL building
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:3000'
  },
  writable: true
})

describe('ApiServiceUtilities', () => {
  let service: TestApiService

  beforeEach(() => {
    service = new TestApiService()
    vi.clearAllMocks()
  })

  describe('request', () => {
    it('should make GET request with credentials by default', async () => {
      const mockData = { data: 'test' }
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      const result = await service.testRequest('/api/test')

      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'GET',
        credentials: 'include'
      })
      expect(result).toEqual(mockData)
    })

    it('should allow custom request options', async () => {
      const mockData = { success: true }
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      const result = await service.testRequest('/api/test', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' }),
        headers: { 'Custom-Header': 'value' }
      })

      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ test: 'data' }),
        headers: { 'Custom-Header': 'value' }
      })
      expect(result).toEqual(mockData)
    })

    it('should override default GET method with custom method', async () => {
      const mockData = { updated: true }
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(mockResponse)

      await service.testRequest('/api/test', { method: 'PUT' })

      expect(global.fetch).toHaveBeenCalledWith('/api/test', {
        method: 'PUT',
        credentials: 'include'
      })
    })

    it('should throw a mapped error key when response is not ok', async () => {
      const errorResponse = new Response(
        JSON.stringify({ error: 'The requested resource was not found.' }),
        {
          status: 404,
          statusText: 'Not Found',
          headers: { 'content-type': 'application/json' }
        }
      )
      vi.mocked(global.fetch).mockResolvedValue(errorResponse)

      await expect(service.testRequest('/api/test')).rejects.toThrow(
        'api.error-messages.not-found'
      )
    })

    it('should propagate known API error codes', async () => {
      const knownError = 'auth.invalid-credentials'
      const errorResponse = new Response(
        JSON.stringify({ error: knownError }),
        {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'content-type': 'application/json' }
        }
      )
      vi.mocked(global.fetch).mockResolvedValue(errorResponse)

      await expect(service.testRequest('/api/test')).rejects.toThrow(knownError)
    })

    it('should throw default error message when response has no error field', async () => {
      const errorResponse = new Response(JSON.stringify({}), {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'content-type': 'application/json' }
      })
      vi.mocked(global.fetch).mockResolvedValue(errorResponse)

      await expect(service.testRequest('/api/test')).rejects.toThrow(
        'api.error-messages.generic'
      )
    })

    it('should handle non-JSON error responses', async () => {
      const errorResponse = new Response('Plain text error', {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'content-type': 'text/plain' }
      })
      vi.mocked(global.fetch).mockResolvedValue(errorResponse)

      // JSON.parse will fail on plain text
      await expect(service.testRequest('/api/test')).rejects.toThrow()
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network request failed')
      vi.mocked(global.fetch).mockRejectedValue(networkError)

      await expect(service.testRequest('/api/test')).rejects.toThrow(
        'Network request failed'
      )
    })

    it('should handle timeout-like scenarios', async () => {
      vi.useFakeTimers()

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 100)
      )

      vi.mocked(global.fetch).mockImplementation(() => timeoutPromise)

      const requestPromise = service.testRequest('/api/test')

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(100)

      await expect(requestPromise).rejects.toThrow('Timeout')

      vi.useRealTimers()
    })
  })

  describe('buildUrl', () => {
    it('should build URL with base path', () => {
      const url = service.testBuildUrl('/api/test')
      expect(url).toBe('http://localhost:3000/api/test')
    })

    it('should add query parameters', () => {
      const url = service.testBuildUrl('/api/test', {
        userId: '123',
        asadaId: '456'
      })

      expect(url).toContain('http://localhost:3000/api/test')
      expect(url).toContain('userId=123')
      expect(url).toContain('asadaId=456')
    })

    it('should handle empty params object', () => {
      const url = service.testBuildUrl('/api/test', {})
      expect(url).toBe('http://localhost:3000/api/test')
    })

    it('should handle undefined params', () => {
      const url = service.testBuildUrl('/api/test', undefined)
      expect(url).toBe('http://localhost:3000/api/test')
    })

    it('should skip empty string parameters', () => {
      const url = service.testBuildUrl('/api/test', {
        userId: '123',
        emptyParam: '',
        asadaId: '456'
      })

      expect(url).toContain('userId=123')
      expect(url).toContain('asadaId=456')
      expect(url).not.toContain('emptyParam')
    })

    it('should URL encode special characters in parameters', () => {
      const url = service.testBuildUrl('/api/test', {
        search: 'test@example.com',
        query: 'hello world'
      })

      expect(url).toContain('search=test%40example.com')
      // URLSearchParams encodes spaces as '+' (both are valid URL encoding)
      expect(url).toMatch(/query=hello(\+|%20)world/)
    })

    it('should handle multiple parameters with same structure', () => {
      const url = service.testBuildUrl('/api/test', {
        filter: 'status',
        value: 'active',
        sort: 'date'
      })

      const urlObj = new URL(url)
      expect(urlObj.searchParams.get('filter')).toBe('status')
      expect(urlObj.searchParams.get('value')).toBe('active')
      expect(urlObj.searchParams.get('sort')).toBe('date')
    })

    it('should build absolute URLs correctly', () => {
      const url = service.testBuildUrl('/api/pods/123')
      expect(url).toBe('http://localhost:3000/api/pods/123')
    })

    it('should handle relative paths with query params', () => {
      const url = service.testBuildUrl('/api/test', {
        page: '1',
        limit: '10'
      })

      expect(url).toBe('http://localhost:3000/api/test?page=1&limit=10')
    })
  })
})
