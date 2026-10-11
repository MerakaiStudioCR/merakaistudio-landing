import type { FiltersConfig } from '../types'
import type { SerializedFilters } from '../types/context.types'
import type { DateRangeValue } from '../types'

export const dateToIsoDate = (date?: Date) =>
  date ? date.toISOString().slice(0, 10) : ''

// Parse ISO date string (YYYY-MM-DD) as local date to avoid timezone issues
const parseIsoDateAsLocal = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const parseFiltersFromUrl = (
  configs: FiltersConfig,
  params: URLSearchParams
): SerializedFilters => {
  const state: SerializedFilters = {}

  configs.forEach(({ type, key, initialValue }) => {
    switch (type) {
      case 'text':
      case 'combobox':
      case 'single-option': {
        const fromUrl = params.get(key)
        if (fromUrl) {
          state[key] = fromUrl
          break
        }

        if (initialValue !== undefined && initialValue !== null) {
          state[key] = String(initialValue)
          break
        }

        state[key] = undefined
        break
      }
      case 'multi-option': {
        const v = params.get(key)
        state[key] = v ? v.split(',').filter(Boolean) : []
        break
      }
      case 'boolean': {
        const v = params.get(key)
        state[key] = v === 'true' ? true : v === 'false' ? false : undefined
        break
      }
      case 'date': {
        const v = params.get(key)
        state[key] = v ? parseIsoDateAsLocal(v) : undefined
        break
      }
      case 'date-range': {
        const from = params.get(`${key}_from`)
        const to = params.get(`${key}_to`)
        state[key] = {
          start: from ? parseIsoDateAsLocal(from) : undefined,
          end: to ? parseIsoDateAsLocal(to) : undefined
        }
        break
      }
      default:
        break
    }
  })

  return state
}

export const serializeFiltersToUrl = (
  configs: FiltersConfig,
  state: SerializedFilters
): Record<string, string> => {
  const output: Record<string, string> = {}

  // Helper function to set a value in the output object
  const set = (key: string, value?: string) => {
    if (value && value !== '') {
      output[key] = value
    }
  }

  configs.forEach(({ type, key }) => {
    const value = state[key]

    // Verify that the value is not empty
    if (
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return
    }

    switch (type) {
      case 'text':
      case 'combobox':
      case 'single-option':
        if (value !== 'all') {
          set(key, String(value))
        }
        break
      case 'multi-option':
        set(key, (value as string[]).join(','))
        break
      case 'boolean':
        set(key, String(value))
        break
      case 'date':
        set(key, dateToIsoDate(value as Date))
        break
      case 'date-range': {
        const range = value as DateRangeValue
        set(`${key}_from`, dateToIsoDate(range.start))
        set(`${key}_to`, dateToIsoDate(range.end))
        break
      }
      default:
        break
    }
  })

  return output
}
