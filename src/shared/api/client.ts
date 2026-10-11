import authInterceptor from './interceptors/auth.interceptor'
import contentTypeInterceptor from './interceptors/content-type.interceptor'
import jsonInterceptor from './interceptors/json.interceptor'
import type {
  RequestOptions,
  RequestInterceptor,
  ResponseInterceptor
} from './types'

class ApiClient {
  private interceptors = {
    request: [contentTypeInterceptor, authInterceptor] as RequestInterceptor[],
    response: [jsonInterceptor] as ResponseInterceptor[]
  }

  async request<T = unknown>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Apply request interceptors
    let modifiedRequest: RequestOptions = { url, ...options }
    for (const interceptor of this.interceptors.request) {
      modifiedRequest = await interceptor(modifiedRequest)
    }

    // Make the actual request
    const response = await fetch(modifiedRequest.url, modifiedRequest)

    // Apply response interceptors
    let modifiedResponse = response
    for (const interceptor of this.interceptors.response) {
      modifiedResponse = await interceptor(modifiedResponse)
    }

    return modifiedResponse as T
  }
}

// Create a singleton instance
const apiClient = new ApiClient()

export default apiClient
