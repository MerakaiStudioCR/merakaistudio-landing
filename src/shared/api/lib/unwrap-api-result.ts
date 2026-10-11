/**
 * Unwraps zaffiro-api envelopes: { result }, legacy { data }, or raw payload.
 */
export const unwrapApiResult = <T = unknown>(data: unknown): T => {
  if (data === null || typeof data !== 'object') {
    return data as T
  }

  if ('result' in data && (data as { result: unknown }).result !== undefined) {
    return (data as { result: T }).result
  }

  if ('data' in data && (data as { data: unknown }).data !== undefined) {
    return (data as { data: T }).data
  }

  return data as T
}
