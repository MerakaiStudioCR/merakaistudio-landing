/**
 * Pod-domain routes live under `{gateway}/v1/*` (e.g. `/v1/pods/filters`).
 * Accepts either `http://host` or `http://host/v1`.
 */
export function resolvePodApiBaseUrl(configuredUrl: string): string {
  if (!configuredUrl) return ''

  const trimmed = configuredUrl.trim().replace(/\/$/, '')
  if (!trimmed) return ''
  if (trimmed.endsWith('/v1')) return trimmed

  return `${trimmed}/v1`
}
