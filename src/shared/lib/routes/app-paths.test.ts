import { describe, expect, it } from 'vitest'
import { correctiveActionPath, operationalAlertPath } from './app-paths'

describe('operational entity paths', () => {
  it('builds the alert by-id path', () => {
    expect(operationalAlertPath('alert-1')).toBe('/operational/alerts/alert-1')
  })

  it('builds the corrective action by-id path', () => {
    expect(correctiveActionPath('ca-1')).toBe(
      '/operational/corrective-actions/ca-1'
    )
  })
})
