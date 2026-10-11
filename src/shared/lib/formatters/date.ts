/**
 * Formats a date for display in the UI using locale-specific formatting
 * @param date - Date string, Date object, or undefined
 * @returns Formatted date string for display, or undefined if date is invalid
 */
export const formatDateForDisplay = (
  date: string | Date
): string | undefined => {
  if (!date) return undefined

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(dateObj.getTime())) {
    return undefined
  }

  return dateObj.toLocaleDateString('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Formats a date-time for display (date + hour:minute) in es-CR locale.
 */
export const formatDateTimeForDisplay = (
  date: string | Date | null | undefined
): string | undefined => {
  if (!date) return undefined

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(dateObj.getTime())) {
    return undefined
  }

  return dateObj.toLocaleString('es-CR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Formats a date for detail views (e.g. "20 septiembre 2025").
 */
export const formatLongDateForDisplay = (
  date: string | Date
): string | undefined => {
  if (!date) return undefined

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(dateObj.getTime())) {
    return undefined
  }

  const formatted = dateObj.toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

/**
 * Parses a date string into a Date object
 * For date-only strings (no time component), parses as local midnight to avoid timezone shifts
 * @param dateString - Date string in various formats
 * @returns Date object, or undefined if date is invalid
 */
export const parseDateString = (
  dateString: string | Date | undefined
): Date | undefined => {
  if (!dateString) return undefined

  if (dateString instanceof Date) {
    return Number.isNaN(dateString.getTime()) ? undefined : dateString
  }

  // Try parsing with Date constructor first
  const parsed = new Date(dateString)

  if (Number.isNaN(parsed.getTime())) {
    return undefined
  }

  // Check if the parsed date is at midnight UTC (likely a date-only string)
  // If so, recreate it as local midnight to avoid timezone shifts
  if (
    parsed.getUTCHours() === 0 &&
    parsed.getUTCMinutes() === 0 &&
    parsed.getUTCSeconds() === 0 &&
    parsed.getUTCMilliseconds() === 0
  ) {
    return new Date(
      parsed.getUTCFullYear(),
      parsed.getUTCMonth(),
      parsed.getUTCDate()
    )
  }

  return parsed
}

/**
 * Formats a date to standard format (YYYY-MM-DD) for API requests
 * Uses UTC to avoid timezone issues
 * @param date - Date string, Date object, or undefined
 * @returns Date string in YYYY-MM-DD format, or undefined if date is invalid
 */
export const formatDateToStandard = (
  date: string | Date
): string | undefined => {
  if (!date) return undefined

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(dateObj.getTime())) {
    return undefined
  }

  const year = dateObj.getUTCFullYear()
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Relative date label for list views (Hoy, Ayer, or long formatted date).
 */
export function formatRelativeDateLabel(
  date: string | Date | null | undefined
): string | undefined {
  if (!date) return undefined

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (Number.isNaN(dateObj.getTime())) {
    return undefined
  }

  const today = startOfDay(new Date())
  const target = startOfDay(dateObj)
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'

  return formatLongDateForDisplay(dateObj)
}
