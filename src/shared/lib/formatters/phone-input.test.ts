import { describe, expect, it } from 'vitest'
import {
  formatPhoneWithHyphen,
  isValidOptionalPhoneDigits,
  isValidPhoneDigits,
  stripPhoneDigits
} from './phone-input'

describe('phone-input formatters', () => {
  it('strips non-digits and limits to 8 characters', () => {
    expect(stripPhoneDigits('8888-8888')).toBe('88888888')
    expect(stripPhoneDigits('+506 8888-8888')).toBe('50688888')
    expect(stripPhoneDigits('123456789012')).toBe('12345678')
  })

  it('formats digits with a hyphen after the fourth digit', () => {
    expect(formatPhoneWithHyphen('8888')).toBe('8888')
    expect(formatPhoneWithHyphen('88888888')).toBe('8888-8888')
    expect(formatPhoneWithHyphen('8888-8888')).toBe('8888-8888')
  })

  it('validates required and optional phone values', () => {
    expect(isValidPhoneDigits('88888888')).toBe(true)
    expect(isValidPhoneDigits('8888')).toBe(false)
    expect(isValidOptionalPhoneDigits('')).toBe(true)
    expect(isValidOptionalPhoneDigits('88888888')).toBe(true)
    expect(isValidOptionalPhoneDigits('8888')).toBe(false)
  })
})
