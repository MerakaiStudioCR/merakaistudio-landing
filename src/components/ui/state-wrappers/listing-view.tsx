'use client'

import FiltersProvider from '~/components/ui/filters/context/filters-provider'
import FiltersManager from '~/components/ui/filters'
import type { FiltersConfig } from '~/components/ui/filters/types'

interface Props {
  configs: FiltersConfig
  isFiltersLoading?: boolean
  columns?: 3 | 4
  children: React.ReactNode
}

const ListingView = ({
  configs,
  isFiltersLoading = false,
  columns,
  children
}: Props) => {
  return (
    <div
      className='flex min-h-0 flex-1 flex-col gap-4'
      data-slot='listing-view'
    >
      <FiltersProvider configs={configs}>
        {isFiltersLoading ? null : <FiltersManager columns={columns} />}
        {children}
      </FiltersProvider>
    </div>
  )
}

export default ListingView
