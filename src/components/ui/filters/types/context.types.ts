import type { z } from 'zod'
import type { DateRangeValue, FiltersConfig } from '../types'

export type FilterSerializable =
  | string
  | string[]
  | boolean
  | Date
  | DateRangeValue

export type SerializedFilters = Record<string, FilterSerializable | undefined>

export interface FiltersContextValue {
  filters: FiltersConfig
  schema: z.ZodObject<Record<string, z.ZodTypeAny>>
  defaults: SerializedFilters
  managedKeys: string[]
  activeFilters: SerializedFilters
  setActiveFilters: (filters: SerializedFilters) => void
}
