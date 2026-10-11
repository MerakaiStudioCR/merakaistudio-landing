import type { z } from 'zod'
import type { SelectOption } from '~/shared/types'

export type FilterType =
  | 'text'
  | 'date'
  | 'date-range'
  | 'single-option'
  | 'multi-option'
  | 'boolean'
  | 'combobox'

export type FilterOption = SelectOption<string>

export interface DateRangeValue {
  start?: Date
  end?: Date
}

export type FilterInitialValue =
  | undefined
  | string
  | boolean
  | string[]
  | Date
  | DateRangeValue

export type FilterSection = 'primary' | 'advanced'

export type FilterConfig = {
  key: string
  type: FilterType
  label: string
  placeholder?: string
  initialValue?: FilterInitialValue
  /** Visible row in the primary filter block (default: 1). */
  primaryRow?: 1 | 2
  /** `advanced` renders inside the collapsible hidden-filters section. */
  section?: FilterSection
  /** Tailwind classes for the field wrapper (e.g. `sm:col-span-2` in grid layouts). */
  wrapperClass?: string
  schema?: z.ZodObject<Record<string, z.ZodTypeAny>>
  options?: FilterOption[]
  fetchOptions?: (searchTerm: string) => Promise<FilterOption[]>
  fetchInitialLabel?: (value: string) => Promise<string | undefined>
}

export type FiltersConfig = FilterConfig[]

export interface FilterResolverProps {
  config: FilterConfig
  value: FilterInitialValue
}
