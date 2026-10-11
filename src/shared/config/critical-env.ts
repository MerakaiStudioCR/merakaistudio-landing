export interface EnvSource {
  NODE_ENV?: string
  API_BASE_URL?: string
  INTERNAL_API_KEY?: string
}

function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function collectCriticalEnvIssues(env: EnvSource): string[] {
  const issues: string[] = []
  const apiBaseUrl = env.API_BASE_URL?.trim() ?? ''

  if (apiBaseUrl.length > 0 && !isAbsoluteHttpUrl(apiBaseUrl)) {
    issues.push('API_BASE_URL must be an absolute http(s) URL')
  }

  if (env.NODE_ENV === 'production' && apiBaseUrl.length > 0) {
    const internalApiKey = env.INTERNAL_API_KEY?.trim() ?? ''
    if (internalApiKey.length === 0) {
      issues.push('INTERNAL_API_KEY is required in production')
    }
  }

  return issues
}

export class CriticalConfigError extends Error {
  readonly issues: string[]

  constructor(issues: string[]) {
    super(`Critical configuration is invalid: ${issues.join('; ')}`)
    this.name = 'CriticalConfigError'
    this.issues = issues
  }
}

export function assertCriticalEnv(env: EnvSource): void {
  const issues = collectCriticalEnvIssues(env)
  if (issues.length > 0) throw new CriticalConfigError(issues)
}
