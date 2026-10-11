import { describe, it, expect } from 'vitest'
import { roundToSixDecimals } from './utils'

describe('roundToSixDecimals', () => {
  it('should round to 6 decimal places', () => {
    expect(roundToSixDecimals(10.123456789)).toBe(10.123457)
  })

  it('should preserve values with 6 or fewer decimals', () => {
    expect(roundToSixDecimals(10.123456)).toBe(10.123456)
    expect(roundToSixDecimals(10.12)).toBe(10.12)
    expect(roundToSixDecimals(10)).toBe(10)
  })

  it('should handle negative coordinates', () => {
    expect(roundToSixDecimals(-84.6543219)).toBe(-84.654322)
  })

  it('should handle zero', () => {
    expect(roundToSixDecimals(0)).toBe(0)
  })

  it('should round correctly at boundary', () => {
    expect(roundToSixDecimals(10.1234565)).toBe(10.123457) // rounds up
    expect(roundToSixDecimals(10.1234564)).toBe(10.123456) // rounds down
  })
})
