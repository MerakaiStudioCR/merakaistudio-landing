export const parseBooleanValue = (value: unknown): boolean => {
  if (typeof value === 'boolean') return value
  if (value === 'true' || value === '1' || value === 'on') return true
  return false
}

export const parseOptionalBooleanValue = (
  value: unknown,
  fallback = false
): boolean => {
  if (value === undefined || value === null || value === '') return fallback
  return parseBooleanValue(value)
}
