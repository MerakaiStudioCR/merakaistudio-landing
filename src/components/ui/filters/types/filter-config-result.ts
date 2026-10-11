import type { FiltersConfig } from '~/components/ui/filters/types'

export interface FilterConfigResult {
  config: FiltersConfig
  isLoading: boolean
}

export const staticFilterConfig = (
  config: FiltersConfig
): FilterConfigResult => ({
  config,
  isLoading: false
})

export const combineFilterLoading = (...flags: boolean[]): boolean =>
  flags.some(Boolean)
