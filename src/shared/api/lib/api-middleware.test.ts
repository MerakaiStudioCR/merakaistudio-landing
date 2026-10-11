import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import createApiMiddleware from './api-middleware'
import getErrorMessage from './error-messages'

// Mock dependencies
vi.mock('./error-messages', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./error-messages')>()
  return {
    ...actual,
    default: vi.fn(actual.default)
  }
})

vi.mock('~/shared/lib/debug', () => ({
  default: {
    error: vi.fn()
  }
}))

vi.mock('~/shared/lib/cookies/auth-cookie', () => ({
  requireAuthenticatedUser: vi.fn().mockResolvedValue({
    token: 'test-token'
  })
}))

describe('API Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createApiMiddleware', () => {
    it('should call handler and return JSON response on success', async () => {
      const mockHandler = vi.fn().mockResolvedValue({ data: 'test' })
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(mockHandler).toHaveBeenCalledWith(mockRequest, mockContext)
      expect(response).toBeInstanceOf(NextResponse)
      expect(response.status).toBe(200)
      expect(json).toEqual({ data: 'test' })
    })

    it('should validate required query parameters', async () => {
      const mockHandler = vi.fn()
      const middleware = createApiMiddleware({
        handler: mockHandler,
        requiredParams: ['userId', 'asadaId']
      })

      const mockRequest = new NextRequest(
        'http://localhost:3000/api/test?userId=123'
      )
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(mockHandler).not.toHaveBeenCalled()
      expect(response.status).toBe(400)
      expect(json.error).toContain('Missing required parameters')
      expect(json.parameters).toContain('asadaId')
    })

    it('should pass validation when all required params are present', async () => {
      const mockHandler = vi.fn().mockResolvedValue({ success: true })
      const middleware = createApiMiddleware({
        handler: mockHandler,
        requiredParams: ['userId', 'asadaId']
      })

      const mockRequest = new NextRequest(
        'http://localhost:3000/api/test?userId=123&asadaId=456'
      )
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(mockHandler).toHaveBeenCalled()
      expect(response.status).toBe(200)
      expect(json).toEqual({ success: true })
    })

    it('should handle Error instances and map status codes', async () => {
      vi.mocked(getErrorMessage).mockReturnValue('auth.invalid-credentials')

      const mockHandler = vi
        .fn()
        .mockRejectedValue(new Error('Invalid credentials'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(getErrorMessage).toHaveBeenCalledWith('Invalid credentials')
      expect(response.status).toBe(401)
      expect(json.error).toBe('auth.invalid-credentials')
    })

    it('omits upstream rawMessage and keeps structured details', async () => {
      vi.mocked(getErrorMessage).mockReturnValue(
        'api.error-messages.unauthorized'
      )

      const error = Object.assign(
        new Error('You are not authorized to access this resource.'),
        {
          statusCode: 401,
          rawMessage: 'You are not authorized to access this resource.',
          code: 'UPSTREAM_DENIED'
        }
      )
      const middleware = createApiMiddleware({
        handler: vi.fn().mockRejectedValue(error)
      })

      const response = await middleware(
        new NextRequest('http://localhost:3000/api/customers'),
        { params: Promise.resolve({}) }
      )
      const json = await response.json()

      expect(response.status).toBe(401)
      expect(json).toEqual({
        error: 'api.error-messages.unauthorized',
        code: 'UPSTREAM_DENIED'
      })
      expect(json.rawMessage).toBeUndefined()
    })

    it('should return 503 for network errors', async () => {
      vi.mocked(getErrorMessage).mockReturnValue('api.error-messages.network')

      const mockHandler = vi.fn().mockRejectedValue(new Error('Network error'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(response.status).toBe(503)
      expect(json.error).toBe('api.error-messages.network')
    })

    it('returns 400 for Zod validation errors without issue details', async () => {
      const schema = z.object({
        amount: z.number().positive(),
        items: z.array(z.string()).min(1)
      })
      const middleware = createApiMiddleware({
        handler: vi.fn().mockImplementation(() => {
          schema.parse({ amount: -1, items: [] })
          return {}
        })
      })

      const response = await middleware(
        new NextRequest('http://localhost:3000/api/payments/process-invoices', {
          method: 'POST'
        }),
        { params: Promise.resolve({}) }
      )
      const json = await response.json()

      expect(response.status).toBe(400)
      expect(json).toEqual({ error: 'api.error-messages.validation-error' })
    })

    it('should return 500 for unknown errors', async () => {
      vi.mocked(getErrorMessage).mockReturnValue('api.error-messages.generic')

      const mockHandler = vi.fn().mockRejectedValue(new Error('Unknown error'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('api.error-messages.generic')
    })

    it('should handle non-Error throws', async () => {
      const mockHandler = vi.fn().mockRejectedValue('String error')
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('api.error-messages.generic')
    })

    it('should handle null/undefined required params', async () => {
      const mockHandler = vi.fn()
      const middleware = createApiMiddleware({
        handler: mockHandler,
        requiredParams: ['userId']
      })

      const mockRequest = new NextRequest(
        'http://localhost:3000/api/test?userId='
      )
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(mockHandler).not.toHaveBeenCalled()
      expect(response.status).toBe(400)
      expect(json.error).toContain('Missing required parameters')
    })

    it('should handle empty requiredParams array', async () => {
      const mockHandler = vi.fn().mockResolvedValue({ data: 'test' })
      const middleware = createApiMiddleware({
        handler: mockHandler,
        requiredParams: []
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)

      expect(mockHandler).toHaveBeenCalled()
      expect(response.status).toBe(200)
    })

    it('should return 201 when successStatus is specified', async () => {
      const mockHandler = vi.fn().mockResolvedValue({ id: '123' })
      const middleware = createApiMiddleware({
        handler: mockHandler,
        successStatus: 201
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)

      expect(response.status).toBe(201)
    })

    it('should return 403 for forbidden errors', async () => {
      vi.mocked(getErrorMessage).mockReturnValue('api.error-messages.forbidden')

      const mockHandler = vi.fn().mockRejectedValue(new Error('Forbidden'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)

      expect(response.status).toBe(403)
    })

    it('should return 404 for not-found errors', async () => {
      vi.mocked(getErrorMessage).mockReturnValue('api.error-messages.not-found')

      const mockHandler = vi.fn().mockRejectedValue(new Error('Not found'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)

      expect(response.status).toBe(404)
    })

    it('should return 400 for validation errors', async () => {
      vi.mocked(getErrorMessage).mockReturnValue(
        'api.error-messages.validation-error'
      )

      const mockHandler = vi.fn().mockRejectedValue(new Error('Validation'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)

      expect(response.status).toBe(400)
    })

    it('should return 504 for timeout errors', async () => {
      vi.mocked(getErrorMessage).mockReturnValue('api.error-messages.timeout')

      const mockHandler = vi.fn().mockRejectedValue(new Error('Timeout'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)

      expect(response.status).toBe(504)
    })

    it('should return 429 for rate-limited auth requests', async () => {
      vi.mocked(getErrorMessage).mockReturnValue(
        'api.error-messages.too-many-requests'
      )

      const mockHandler = vi
        .fn()
        .mockRejectedValue(new Error('Too many requests'))
      const middleware = createApiMiddleware({
        handler: mockHandler
      })

      const mockRequest = new NextRequest('http://localhost:3000/api/test')
      const mockContext = { params: Promise.resolve({}) }

      const response = await middleware(mockRequest, mockContext)
      const json = await response.json()

      expect(response.status).toBe(429)
      expect(json.error).toBe('api.error-messages.too-many-requests')
    })
  })
})
