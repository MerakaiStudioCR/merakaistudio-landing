import { describe, expect, it } from 'vitest'
import siteEn from './messages/site/en.json'
import siteEs from './messages/site/es.json'

function keys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return [prefix]
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    keys(nested, prefix ? `${prefix}.${key}` : key)
  )
}

describe('site messages', () => {
  it('keeps Spanish and English keys aligned', () => {
    expect(keys(siteEn).sort()).toEqual(keys(siteEs).sort())
  })
})
