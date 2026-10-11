import { formatDateToStandard } from '~/shared/lib/formatters/date'

export const formatFilterDateFrom = (
  date: string | Date
): string | undefined => {
  const day = formatDateToStandard(date)
  return day ? `${day}T00:00:00.000Z` : undefined
}

export const formatFilterDateTo = (date: string | Date): string | undefined => {
  const day = formatDateToStandard(date)
  return day ? `${day}T23:59:59.999Z` : undefined
}
