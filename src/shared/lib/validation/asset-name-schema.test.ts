import { describe, expect, it } from 'vitest'
import { assetNameSchema } from './asset-name-schema'

describe('assetNameSchema', () => {
  it('accepts common infrastructure names', () => {
    expect(assetNameSchema.safeParse('Tanque #1').success).toBe(true)
    expect(assetNameSchema.safeParse('Naciente El Roble').success).toBe(true)
    expect(assetNameSchema.safeParse('Sector Central').success).toBe(true)
    expect(assetNameSchema.safeParse('Zona Alta').success).toBe(true)
  })

  it('trims surrounding whitespace', () => {
    const result = assetNameSchema.safeParse('  Norte  ')
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toBe('Norte')
    }
  })

  it('rejects empty and whitespace-only names', () => {
    expect(assetNameSchema.safeParse('').success).toBe(false)
    expect(assetNameSchema.safeParse('   ').success).toBe(false)
  })

  it('rejects names that are too short', () => {
    expect(assetNameSchema.safeParse('A').success).toBe(false)
  })

  it('rejects unsupported characters', () => {
    expect(assetNameSchema.safeParse('Sector@Central').success).toBe(false)
    expect(assetNameSchema.safeParse('Tanque <1>').success).toBe(false)
  })

  it('rejects names without letters or numbers', () => {
    expect(assetNameSchema.safeParse('--').success).toBe(false)
    expect(assetNameSchema.safeParse('...').success).toBe(false)
  })
})
