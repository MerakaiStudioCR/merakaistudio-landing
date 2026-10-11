interface ExpiredCookieOptions {
  path?: string
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

/**
 * Builds a raw `Set-Cookie` header value that expires a cookie immediately.
 *
 * IMPORTANT (Azure Static Web Apps):
 * SWA strips any Set-Cookie header that includes an `Expires` date in the past
 * (see https://github.com/Azure/static-web-apps/issues/1214).
 * Use Max-Age=0 only — never Expires=1970 — or logout cookies never reach the browser.
 */
export const buildExpiredCookieHeader = (
  name: string,
  {
    path = '/',
    httpOnly = true,
    secure = false,
    sameSite = 'lax'
  }: ExpiredCookieOptions = {}
): string => {
  const sameSiteValue = sameSite.charAt(0).toUpperCase() + sameSite.slice(1)

  const parts = [
    `${name}=`,
    `Path=${path}`,
    'Max-Age=0',
    `SameSite=${sameSiteValue}`
  ]

  if (httpOnly) parts.push('HttpOnly')
  if (secure) parts.push('Secure')

  return parts.join('; ')
}
