import {
  getApiErrorMessage,
  getSanitizedApiErrorKey
} from '~/shared/api/lib/api-error-message'
import { assignApiErrorDetails } from '~/shared/api/lib/api-error-details'

/**
 * Response interceptor that automatically parses JSON responses
 */
const jsonInterceptor = async (response: Response) => {
  // Handle 204 No Content - return null (no body expected)
  if (response.status === 204) {
    return null
  }

  // Check if response body is empty (only error on 200 with empty body)
  const contentLength = response.headers.get('content-length')
  if (contentLength === '0' && response.status === 200) {
    mk_debug.error('Empty response body from API', {
      url: response.url,
      status: response.status
    })
    throw new Error('API returned an empty response')
  }

  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    try {
      const data = await response.json()

      if (!response.ok) {
        const rawMessage = getApiErrorMessage(data)
        const message =
          rawMessage !== null
            ? getSanitizedApiErrorKey(data)
            : response.status === 403
              ? 'api.error-messages.forbidden'
              : response.status === 401
                ? 'api.error-messages.unauthorized'
                : response.status === 404
                  ? 'api.error-messages.not-found'
                  : 'api.error-messages.generic'

        mk_debug.error('API returned error response', {
          url: response.url,
          status: response.status,
          message,
          data
        })

        const error = new Error(message) as Error & {
          validationErrors?: unknown[]
          errorType?: string
          statusCode?: number
          rawMessage?: string
        }

        error.statusCode = response.status
        if (rawMessage) error.rawMessage = rawMessage
        // Runs after the fallback above so the backend's own `rawMessage`
        // field (the actual human-readable reason) wins over the derived
        // one, which for a {error: <sanitized key>, rawMessage: <text>}
        // shape above ends up being the sanitized key itself.
        assignApiErrorDetails(error, data)

        if (data && typeof data === 'object') {
          const record = data as Record<string, unknown>
          if (Array.isArray(record.errors) && record.errors.length > 0) {
            error.validationErrors = record.errors
          }
          if (typeof record.type === 'string') {
            error.errorType = record.type
          }
        }

        throw error
      }

      return data
    } catch (error) {
      // Re-throw if it's already an error we created
      if (
        error instanceof Error &&
        error.message !== 'Failed to parse API response as JSON'
      ) {
        throw error
      }

      mk_debug.error('Failed to parse JSON response', {
        url: response.url,
        error
      })
      throw new Error('Failed to parse API response as JSON')
    }
  }

  return response
}

export default jsonInterceptor
