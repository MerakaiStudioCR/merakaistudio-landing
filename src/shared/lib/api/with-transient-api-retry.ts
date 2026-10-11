interface TransientApiRetryOptions {
  maxAttempts?: number
  baseDelayMs?: number
}

const TRANSIENT_STATUS_CODES = new Set([502, 503, 504])

export function isTransientApiError(error: unknown): boolean {
  if (!(error instanceof Error)) return false

  const statusCode = (error as Error & { statusCode?: number }).statusCode
  if (statusCode != null && TRANSIENT_STATUS_CODES.has(statusCode)) {
    return true
  }

  const errorType = (error as Error & { errorType?: string }).errorType
  return errorType === 'InternalError' || errorType === 'ConnectionFailure'
}

export async function withTransientApiRetry<T>(
  operation: () => Promise<T>,
  { maxAttempts = 3, baseDelayMs = 750 }: TransientApiRetryOptions = {}
): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      if (!isTransientApiError(error) || attempt === maxAttempts) {
        throw error
      }

      await new Promise((resolve) => {
        setTimeout(resolve, baseDelayMs * attempt)
      })
    }
  }

  throw lastError
}
