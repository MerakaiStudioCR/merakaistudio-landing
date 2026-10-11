'use client'

import TextFilter from './resolvers/text-filter'
import SingleSelectFilter from './resolvers/select-filter'
import MultiSelectFilter from './resolvers/multi-select-filter'
import BooleanFilter from './resolvers/boolean-filter'
import DateFilter, { DateRangeFilter } from './resolvers/date-filter'
import ComboboxFilter from './resolvers/combobox-filter'
import type { FilterType, FilterResolverProps } from './types'

type FilterResolver = Record<
  FilterType,
  React.ComponentType<FilterResolverProps>
>
const filterResolvers: FilterResolver = {
  text: TextFilter,
  'single-option': SingleSelectFilter,
  'multi-option': MultiSelectFilter,
  boolean: BooleanFilter,
  date: DateFilter,
  'date-range': DateRangeFilter,
  combobox: ComboboxFilter
}

const FilterBuilder = ({ config, value }: FilterResolverProps) => {
  const Resolver = filterResolvers[config.type]

  if (!Resolver) {
    return null
  }

  return <Resolver config={config} value={value} />
}

export default FilterBuilder
