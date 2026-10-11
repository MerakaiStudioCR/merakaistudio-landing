import { PHASE_PRODUCTION_BUILD } from 'next/constants'

export async function register() {
  if (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return
  if (process.env.npm_lifecycle_event === 'build') return

  const { assertCriticalEnv, collectCriticalEnvIssues } = await import(
    '~/shared/config/critical-env'
  )

  if (process.env.NODE_ENV === 'production') {
    assertCriticalEnv(process.env)
    return
  }

  const issues = collectCriticalEnvIssues(process.env)
  if (issues.length === 0) return

  console.warn(`[config] ${issues.join('; ')}`)
}
