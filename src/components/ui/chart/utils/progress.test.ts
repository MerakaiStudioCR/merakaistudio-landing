import { describe, it, expect } from 'vitest'
import { calculateLeft, resolveColor, shouldRoundBarCorners } from './progress'

describe('progress utils', () => {
  describe('calculateLeft', () => {
    it('returns 0 when progress exceeds total', () => {
      expect(calculateLeft(150, 100)).toBe(0)
      expect(calculateLeft(200, 100)).toBe(0)
    })

    it('returns total when progress is 0 or negative', () => {
      expect(calculateLeft(0, 100)).toBe(100)
      expect(calculateLeft(-10, 100)).toBe(100)
    })

    it('calculates remaining amount correctly for valid progress', () => {
      expect(calculateLeft(25, 100)).toBe(75)
      expect(calculateLeft(50, 100)).toBe(50)
      expect(calculateLeft(75, 100)).toBe(25)
      expect(calculateLeft(100, 100)).toBe(0)
    })

    it('handles decimal values', () => {
      expect(calculateLeft(33.5, 100)).toBe(66.5)
      expect(calculateLeft(99.9, 100)).toBeCloseTo(0.1, 10) // floating point precision
    })
  })

  describe('shouldRoundBarCorners', () => {
    it('returns false for zero or negative values', () => {
      expect(shouldRoundBarCorners(0, 100)).toBe(false)
      expect(shouldRoundBarCorners(10, 0)).toBe(false)
      expect(shouldRoundBarCorners(-1, 100)).toBe(false)
    })

    it('returns false when slice is below 15% of total', () => {
      expect(shouldRoundBarCorners(1, 11)).toBe(false)
      expect(shouldRoundBarCorners(14, 100)).toBe(false)
    })

    it('returns true when slice is at least 15% of total', () => {
      expect(shouldRoundBarCorners(15, 100)).toBe(true)
      expect(shouldRoundBarCorners(85, 100)).toBe(true)
    })
  })

  describe('resolveColor', () => {
    it('returns string color when config is a string', () => {
      expect(resolveColor('red', 50)).toBe('red')
      expect(resolveColor('var(--color-primary)', 75)).toBe(
        'var(--color-primary)'
      )
    })

    it('returns first matching threshold color', () => {
      const config = [
        { maxPercent: 30, color: 'red' },
        { maxPercent: 70, color: 'yellow' },
        { maxPercent: 100, color: 'green' }
      ]

      expect(resolveColor(config, 25)).toBe('red')
      expect(resolveColor(config, 30)).toBe('red')
      expect(resolveColor(config, 50)).toBe('yellow')
      expect(resolveColor(config, 70)).toBe('yellow')
      expect(resolveColor(config, 90)).toBe('green')
    })

    it('returns color when threshold has no maxPercent (matches all)', () => {
      const config = [
        { maxPercent: 50, color: 'red' },
        { color: 'green' } // No maxPercent, acts as fallback
      ]

      expect(resolveColor(config, 25)).toBe('red')
      expect(resolveColor(config, 75)).toBe('green')
      expect(resolveColor(config, 100)).toBe('green')
    })

    it('returns last color as fallback when no threshold matches', () => {
      const config = [
        { maxPercent: 30, color: 'red' },
        { maxPercent: 60, color: 'yellow' }
      ]

      expect(resolveColor(config, 90)).toBe('yellow')
      expect(resolveColor(config, 100)).toBe('yellow')
    })

    it('returns default color when config is empty array', () => {
      expect(resolveColor([], 50)).toBe('var(--color-primary)')
    })

    it('handles edge case of single threshold', () => {
      const config = [{ maxPercent: 100, color: 'blue' }]

      expect(resolveColor(config, 0)).toBe('blue')
      expect(resolveColor(config, 50)).toBe('blue')
      expect(resolveColor(config, 100)).toBe('blue')
    })

    it('handles percentage exactly at threshold boundary', () => {
      const config = [
        { maxPercent: 50, color: 'red' },
        { maxPercent: 100, color: 'green' }
      ]

      expect(resolveColor(config, 50)).toBe('red')
      expect(resolveColor(config, 50.1)).toBe('green')
    })
  })
})
