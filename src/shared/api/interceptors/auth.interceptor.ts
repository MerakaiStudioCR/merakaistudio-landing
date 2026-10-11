import { getAuthCookie } from '~/shared/lib/cookies/auth-cookie'
import type { RequestOptions } from '~/shared/api/types'

const authInterceptor = async (
  options: RequestOptions
): Promise<RequestOptions> => {
  const token = await getAuthCookie()

  if (token) {
    const headers = new Headers(options.headers)
    headers.set('Authorization', `Bearer ${token}`)
    return { ...options, headers }
  }

  return options
}

export default authInterceptor
