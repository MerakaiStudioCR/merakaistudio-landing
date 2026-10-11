import type { FilterConfig } from '../types'
import type { SerializedFilters } from '../types/context.types'

const isEmptyRange = (value: { start?: Date; end?: Date }) =>
  !value.start && !value.end

export function isAppliedFilterValue(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false
  if (value === 'all') return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object' && value !== null && 'start' in value) {
    return !isEmptyRange(value as { start?: Date; end?: Date })
  }

  return true
}

export function countAppliedFilters(
  configs: FilterConfig[],
  activeFilters: SerializedFilters
): number {
  return configs.filter((config) =>
    isAppliedFilterValue(activeFilters[config.key])
  ).length
}
