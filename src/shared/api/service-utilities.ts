import { sanitizeApiErrorKey } from './lib/sanitize-api-error-key'
import { addFilterParam } from './lib/url-utils'
import { assignApiErrorDetails } from './lib/api-error-details'

/**
 * Base utility class for client-side API service calls.
 * Provides common utility methods (buildUrl, request) for making API calls.
 *
 * Use this class directly for non-CRUD services (like PreferencesService).
 * For CRUD services, extend CrudServiceBase instead.
 */
export abstract class ApiServiceUtilities {
  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include',
      ...options
    })

    if (response.status === 204) {
      if (!response.ok) {
        const error = new Error('api.error-messages.generic') as Error & {
          statusCode?: number
        }
        error.statusCode = response.status
        throw error
      }

      return undefined as T
    }

    const text = await response.text()
    let data: unknown = null

    if (text) {
      try {
        data = JSON.parse(text)
      } catch {
        if (!response.ok) {
          throw new Error('api.error-messages.generic')
        }

        return undefined as T
      }
    }

    if (!response.ok) {
      const rawError =
        data &&
        typeof data === 'object' &&
        typeof (data as { error?: unknown }).error === 'string'
          ? (data as { error: string }).error.trim()
          : ''

      const errorMessage = sanitizeApiErrorKey(rawError)

      const error = new Error(errorMessage) as Error & { statusCode?: number }
      error.statusCode = response.status
      assignApiErrorDetails(error, data)

      mk_debug.error('API request failed', { response, error: errorMessage })
      throw error
    }

    return data as T
  }

  protected buildUrl(
    path: string,
    params: Record<string, string | number | boolean | undefined> = {}
  ): string {
    const url = new URL(path, window.location.origin)

    Object.entries(params).forEach(([key, value]) => {
      addFilterParam(url, key, value)
    })

    return url.toString()
  }
}
