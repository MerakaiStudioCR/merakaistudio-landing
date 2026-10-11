import { describe, expect, it } from 'vitest'
import {
  formatAmountWithDots,
  parseAmountInput,
  parseFormNumericValue
} from './amount-input'

describe('amount-input formatters', () => {
  it('formats amounts with dot thousand separators', () => {
    expect(formatAmountWithDots(1000)).toBe('1.000')
    expect(formatAmountWithDots(10000)).toBe('10.000')
    expect(formatAmountWithDots(100000)).toBe('100.000')
    expect(formatAmountWithDots(1000000)).toBe('1.000.000')
    expect(formatAmountWithDots(2400000)).toBe('2.400.000')
  })

  it('parses formatted and plain numeric strings', () => {
    expect(parseAmountInput('1.000')).toBe(1000)
    expect(parseAmountInput('2.400.000')).toBe(2400000)
    expect(parseAmountInput('2800')).toBe(2800)
    expect(parseAmountInput('')).toBeUndefined()
  })

  it('parses form values with dotted notation', () => {
    expect(parseFormNumericValue('1.000.000')).toBe(1000000)
    expect(parseFormNumericValue(350000)).toBe(350000)
    expect(parseFormNumericValue('')).toBeUndefined()
  })
})
