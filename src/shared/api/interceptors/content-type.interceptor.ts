import type { RequestOptions } from '~/shared/api/types'

/**
 * Request interceptor that automatically adds Content-Type: application/json header
 * if not already present
 */
const contentTypeInterceptor = (options: RequestOptions): RequestOptions => {
  // FormData sets its own multipart boundary — do not force application/json
  if (options.body instanceof FormData) {
    return options
  }

  // Only add Content-Type for requests with a body (POST, PUT, PATCH)
  if (options.body) {
    const headers = new Headers(options.headers)

    // Only add if not already set
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    return { ...options, headers }
  }

  return options
}

export default contentTypeInterceptor
