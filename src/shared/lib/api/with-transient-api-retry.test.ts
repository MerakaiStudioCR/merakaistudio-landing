import { describe, expect, it, vi } from 'vitest'
import {
  isTransientApiError,
  withTransientApiRetry
} from './with-transient-api-retry'

describe('withTransientApiRetry', () => {
  it('retries transient API errors', async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(
        Object.assign(new Error('api.error-messages.internal-error'), {
          statusCode: 502,
          errorType: 'InternalError'
        })
      )
      .mockResolvedValueOnce('ok')

    const result = await withTransientApiRetry(operation, {
      maxAttempts: 2,
      baseDelayMs: 0
    })

    expect(result).toBe('ok')
    expect(operation).toHaveBeenCalledTimes(2)
  })

  it('does not retry non-transient errors', async () => {
    const operation = vi.fn<() => Promise<string>>().mockRejectedValue(
      Object.assign(new Error('api.error-messages.not-found'), {
        statusCode: 404
      })
    )

    await expect(
      withTransientApiRetry(operation, { maxAttempts: 3, baseDelayMs: 0 })
    ).rejects.toThrow('api.error-messages.not-found')

    expect(operation).toHaveBeenCalledTimes(1)
  })

  it('detects transient errors by status code', () => {
    expect(
      isTransientApiError(Object.assign(new Error('x'), { statusCode: 503 }))
    ).toBe(true)
    expect(
      isTransientApiError(Object.assign(new Error('x'), { statusCode: 400 }))
    ).toBe(false)
  })
})
