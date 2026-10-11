export function formatAmountWithDots(
  value: number | string | undefined | null
): string {
  if (value === undefined || value === null || value === '') return ''

  const digits =
    typeof value === 'number'
      ? String(Math.trunc(Math.abs(value)))
      : value.replace(/\D/g, '')

  if (!digits) return ''

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function parseAmountInput(value: string): number | undefined {
  const digits = value.replace(/\D/g, '')
  if (!digits) return undefined

  const parsed = Number(digits)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function parseFormNumericValue(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined
  }

  return parseAmountInput(String(value))
}
