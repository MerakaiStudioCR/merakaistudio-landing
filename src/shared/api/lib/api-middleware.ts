import { type NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { requireAuthenticatedUser } from '~/shared/lib/cookies/auth-cookie'
import { sanitizeApiErrorKey } from './sanitize-api-error-key'
import { readApiErrorDetails } from './api-error-details'
import '~/shared/lib/debug'

interface ApiMiddlewareOptions<T = Record<string, unknown>> {
  handler: (
    request: NextRequest,
    context: { params: Promise<T> }
  ) => Promise<Record<string, unknown>>
  requiredParams?: string[]
  successStatus?: 200 | 201
  /** When true (default), rejects unauthenticated requests before the handler runs. */
  requireAuth?: boolean
}

const CONTEXT_PRECONDITION_ERRORS = new Set([
  'ASADA not selected',
  'Tenant not selected'
])

const getStatusCode = (
  errorMessage: string,
  rawMessage?: string,
  errorType?: string
): number => {
  if (errorType === 'ConnectionFailure') {
    return 503
  }
  if (rawMessage && CONTEXT_PRECONDITION_ERRORS.has(rawMessage)) {
    return 400
  }
  if (
    errorMessage.includes('unauthorized') ||
    errorMessage === 'auth.invalid-credentials'
  ) {
    return 401
  }
  if (errorMessage.includes('forbidden')) {
    return 403
  }
  if (errorMessage.includes('not-found')) {
    return 404
  }
  if (
    errorMessage.includes('validation') ||
    errorMessage.includes('unprocessable')
  ) {
    return 400
  }
  if (errorMessage.includes('timeout')) {
    return 504
  }
  if (errorMessage.includes('too-many-requests')) {
    return 429
  }
  if (
    errorMessage === 'api.error-messages.connection-error' ||
    errorMessage.includes('network')
  ) {
    return 503
  }
  return 500 // Internal errors
}

const createApiMiddleware = <T = Record<string, unknown>>({
  handler,
  requiredParams = [],
  successStatus = 200,
  requireAuth = true
}: ApiMiddlewareOptions<T>) => {
  return async (request: NextRequest, context: { params: Promise<T> }) => {
    try {
      if (requireAuth) {
        await requireAuthenticatedUser()
      }

      // Validate required parameters
      if (requiredParams.length > 0) {
        const { searchParams } = new URL(request.url)
        const missingParams = requiredParams.filter(
          (param) => !searchParams.get(param)
        )

        if (missingParams.length > 0) {
          return NextResponse.json(
            {
              error: 'Missing required parameters',
              parameters: missingParams
            },
            { status: 400 }
          )
        }
      }

      // Call the handler
      const result = await handler(request, context)

      return NextResponse.json(result, { status: successStatus })
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'api.error-messages.validation-error' },
          { status: 400 }
        )
      }

      if (
        error instanceof Error &&
        CONTEXT_PRECONDITION_ERRORS.has(error.message)
      ) {
        mk_debug.info('API context precondition failed', {
          message: error.message
        })
      } else {
        mk_debug.error('API middleware error', { error })
      }

      // Handle different types of errors
      if (error instanceof Error) {
        const errorMessage = sanitizeApiErrorKey(error.message)
        const apiStatusCode =
          'statusCode' in error &&
          typeof (error as Error & { statusCode?: number }).statusCode ===
            'number'
            ? (error as Error & { statusCode: number }).statusCode
            : undefined

        const statusCode =
          apiStatusCode ??
          getStatusCode(
            errorMessage,
            error.message,
            'errorType' in error &&
              typeof (error as Error & { errorType?: string }).errorType ===
                'string'
              ? (error as Error & { errorType: string }).errorType
              : undefined
          )

        const details = readApiErrorDetails(error)
        delete details.rawMessage

        return NextResponse.json(
          {
            error: errorMessage,
            ...details
          },
          { status: statusCode }
        )
      }

      return NextResponse.json(
        { error: 'api.error-messages.generic' },
        { status: 500 }
      )
    }
  }
}

export default createApiMiddleware
