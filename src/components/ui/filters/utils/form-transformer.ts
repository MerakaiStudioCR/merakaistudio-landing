import type { FiltersConfig, DateRangeValue } from '../types'
import type { SerializedFilters } from '../types/context.types'

export const transformFormDataToState = (
  filters: FiltersConfig,
  parsed: Record<string, unknown>
): SerializedFilters => {
  const state: SerializedFilters = {}

  for (const cfg of filters) {
    const value = parsed[cfg.key]

    if (value === undefined || value === null || value === '') {
      // Ignore if type is date-range, as the keys are different.
      if (cfg.type !== 'date-range') {
        state[cfg.key] = undefined
        continue
      }
    }

    switch (cfg.type) {
      case 'text':
      case 'combobox':
      case 'single-option': {
        state[cfg.key] = String(value)
        break
      }
      case 'multi-option': {
        const csv = String(value)
        state[cfg.key] = csv ? csv.split(',').filter(Boolean) : []
        break
      }
      case 'boolean': {
        state[cfg.key] = Boolean(value)
        break
      }
      case 'date': {
        state[cfg.key] = new Date(String(value))
        break
      }
      case 'date-range': {
        const from = parsed[`${cfg.key}_from`]
        const to = parsed[`${cfg.key}_to`]
        state[cfg.key] = {
          start: from ? new Date(String(from)) : undefined,
          end: to ? new Date(String(to)) : undefined
        } as DateRangeValue
        break
      }
      default:
        break
    }
  }

  return state
}

export const getManagedQueryKeys = (filters: FiltersConfig): string[] => {
  const keys: string[] = []

  for (const cfg of filters) {
    keys.push(cfg.key)
    if (cfg.type === 'date-range') {
      keys.push(`${cfg.key}_from`)
      keys.push(`${cfg.key}_to`)
    }
  }

  return keys
}
