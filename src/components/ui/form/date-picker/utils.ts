import {
  formatDateForDisplay,
  parseDateString
} from '~/shared/lib/formatters/date'
import type { RangeValue } from './types'

export const safeInitialDate = (defaultValue: string | Date | undefined) => {
  return parseDateString(defaultValue)
}

export const formatSingleDate = (date?: Date): string | undefined => {
  if (!date) return undefined
  return formatDateForDisplay(date)
}

export const formatRangeDate = (range?: RangeValue): string | undefined => {
  if (!range) return undefined
  const from = range.start
  const to = range.end
  if (!from && !to) return undefined
  if (from && to) {
    return `${formatDateForDisplay(from)} - ${formatDateForDisplay(to)}`
  }
  return from
    ? `${formatDateForDisplay(from)} - ...`
    : `... - ${formatDateForDisplay(to as Date)}`
}
