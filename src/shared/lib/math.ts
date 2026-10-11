/**
 * Calculates the average of an array of numbers
 * @param numbers Array of numbers to calculate average from
 * @returns The average value, or 0 if the array is empty
 */
export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((acc, num) => acc + num, 0)
  return sum / numbers.length
}

/**
 * Rounds a number to a specified number of decimal places
 * @param num Number to round
 * @param decimals Number of decimal places (default: 2)
 * @returns Rounded number
 */
export const roundToDecimals = (num: number, decimals: number = 2): number => {
  return Math.round(num * 10 ** decimals) / 10 ** decimals
}

/**
 * Parses a number from a string or number.
 * @param value Value to parse
 * @param defaultValue Default value to return if the value is not a number
 * @returns The parsed number, or the default value if the value is not a number
 */
export const parseNumber = (
  value: unknown,
  defaultValue?: number
): number | undefined => {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed === '') return defaultValue
    const num = Number(trimmed)
    return Number.isNaN(num) ? defaultValue : num
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : defaultValue
  }

  return defaultValue
}
