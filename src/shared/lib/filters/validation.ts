/**
 * Validates a select filter value from activeFilters.
 * Returns the string value if it's valid (not 'all' and not empty), otherwise returns undefined.
 *
 * @param value - The filter value to validate (typically from activeFilters)
 * @returns The validated string value, or undefined if invalid
 */
export const validateSelectValue = (value: unknown): string | undefined => {
  if (typeof value === 'string' && value !== 'all' && value.trim() !== '') {
    return value.trim()
  }
  return undefined
}
