import { describe, expect, it } from 'vitest'
import {
  assertCriticalEnv,
  collectCriticalEnvIssues,
  CriticalConfigError
} from './critical-env'

const SECRET = 'super-secret-value'

describe('collectCriticalEnvIssues', () => {
  it('accepts an API base URL outside production without an internal key', () => {
    expect(
      collectCriticalEnvIssues({
        NODE_ENV: 'development',
        API_BASE_URL: 'https://api.example.com/v1'
      })
    ).toEqual([])
  })

  it('accepts a site without an API in development or production', () => {
    expect(collectCriticalEnvIssues({ NODE_ENV: 'development' })).toEqual([])
    expect(collectCriticalEnvIssues({ NODE_ENV: 'production' })).toEqual([])
  })

  it('rejects an invalid URL', () => {
    expect(
      collectCriticalEnvIssues({
        API_BASE_URL: 'ftp://files.example.com'
      })
    ).toEqual(['API_BASE_URL must be an absolute http(s) URL'])
  })

  it('rejects a production runtime without INTERNAL_API_KEY', () => {
    const issues = collectCriticalEnvIssues({
      NODE_ENV: 'production',
      API_BASE_URL: 'https://api.example.com/v1',
      INTERNAL_API_KEY: '   '
    })

    expect(issues).toEqual(['INTERNAL_API_KEY is required in production'])
  })

  it('does not echo secret values when configuration is invalid', () => {
    const cases = [
      {
        NODE_ENV: 'production',
        API_BASE_URL: `https://user:${SECRET}@api.example.com/v1`,
        INTERNAL_API_KEY: ''
      },
      {
        NODE_ENV: 'production',
        API_BASE_URL: 'not a url',
        INTERNAL_API_KEY: SECRET
      }
    ]

    for (const env of cases) {
      try {
        assertCriticalEnv(env)
        expect.fail('expected critical configuration to throw')
      } catch (error) {
        expect(error).toBeInstanceOf(CriticalConfigError)
        expect((error as Error).message).not.toContain(SECRET)
      }
    }
  })
})
