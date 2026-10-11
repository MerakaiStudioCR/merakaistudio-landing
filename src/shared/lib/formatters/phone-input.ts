export const PHONE_DIGIT_LENGTH = 8
export const PHONE_DISPLAY_PLACEHOLDER = '8888-8888'

export function stripPhoneDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, PHONE_DIGIT_LENGTH)
}

export function formatPhoneWithHyphen(value: string): string {
  const digits = stripPhoneDigits(value)
  if (digits.length <= 4) return digits
  return `${digits.slice(0, 4)}-${digits.slice(4)}`
}

export function isValidPhoneDigits(value: string): boolean {
  return /^\d{8}$/.test(value)
}

export function isValidOptionalPhoneDigits(value: string): boolean {
  return value.length === 0 || isValidPhoneDigits(value)
}
