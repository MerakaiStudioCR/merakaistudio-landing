'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import FiltersContext from './filters-context'
import { buildFiltersSchema } from '../utils/schema-builder'
import { parseFiltersFromUrl } from '../utils/url-serialization'
import { getManagedQueryKeys } from '../utils/form-transformer'
import type { FiltersConfig } from '../types'
import type {
  FiltersContextValue,
  SerializedFilters
} from '../types/context.types'

const FiltersProvider = ({
  children,
  configs
}: {
  children: React.ReactNode
  configs: FiltersConfig
}) => {
  const searchParams = useSearchParams()
  const schema = useMemo(() => buildFiltersSchema(configs), [configs])
  const managedKeys = useMemo(() => getManagedQueryKeys(configs), [configs])

  const defaults = useMemo(
    () =>
      parseFiltersFromUrl(
        configs,
        new URLSearchParams(searchParams?.toString())
      ),
    [configs, searchParams]
  )

  // Active filters state that components can read and update
  const [activeFilters, setActiveFiltersState] =
    useState<SerializedFilters>(defaults)

  // Keep active filters in sync with URL (back/forward, shared links)
  useEffect(() => {
    setActiveFiltersState(defaults)
  }, [defaults])

  const setActiveFilters = useCallback((filters: SerializedFilters) => {
    setActiveFiltersState(filters)
  }, [])

  const value: FiltersContextValue = useMemo(
    () => ({
      filters: configs,
      schema,
      defaults,
      managedKeys,
      activeFilters,
      setActiveFilters
    }),
    [configs, schema, defaults, managedKeys, activeFilters, setActiveFilters]
  )

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

export default FiltersProvider
