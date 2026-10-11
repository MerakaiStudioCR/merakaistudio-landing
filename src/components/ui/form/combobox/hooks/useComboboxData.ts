'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CATALOG_STALE_TIME as CACHE_TIME } from '~/shared/lib/react-query/query-config'
import useDebounce from '~/shared/hooks/useDebounce'
import type { ComboboxOption } from '../types'

const MAX_OPTIONS = 5
const DEBOUNCE_DELAY = 500

type Props<T> = {
  value: string
  searchTerm: string
  fetchOptions: (searchTerm: string) => Promise<ComboboxOption<T>[]>
  fetchInitialLabel?: (value: string) => Promise<string | undefined>
  name?: string
}

type ReturnData<T> = {
  options: ComboboxOption<T>[]
  isLoading: boolean
  initialLabel: string | undefined
}

const useComboboxData = <T = unknown>({
  value,
  searchTerm,
  fetchOptions,
  fetchInitialLabel,
  name
}: Props<T>): ReturnData<T> => {
  const [options, setOptions] = useState<ComboboxOption<T>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY)

  // Fetch initial label for existing value
  const { data: initialLabel } = useQuery({
    queryKey: ['combobox-label', name, value] as const,
    queryFn: () => {
      if (!fetchInitialLabel) {
        throw new Error('fetchInitialLabel is required')
      }
      return fetchInitialLabel(value)
    },
    enabled: !!value && !!fetchInitialLabel,
    staleTime: CACHE_TIME,
    retry: 2
  })

  // Show loading during debounce
  const isPendingDebounce =
    searchTerm !== debouncedSearchTerm && searchTerm.trim() !== ''

  useEffect(() => {
    if (isPendingDebounce) {
      setIsLoading(true)
    } else if (!searchTerm.trim()) {
      setIsLoading(false)
    }
  }, [isPendingDebounce, searchTerm])

  // Fetch options on debounced search
  useEffect(() => {
    let isCancelled = false

    const loadOptions = async () => {
      if (!debouncedSearchTerm.trim()) {
        if (!isCancelled) {
          setOptions([])
          setIsLoading(false)
        }
        return
      }

      if (!isCancelled) {
        setIsLoading(true)
      }

      try {
        const results = await fetchOptions(debouncedSearchTerm)
        if (!isCancelled) {
          setOptions(results.slice(0, MAX_OPTIONS))
        }
      } catch (err) {
        if (!isCancelled) {
          mk_debug.error('Failed to fetch combobox options', { error: err })
          setOptions([])
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadOptions()

    return () => {
      isCancelled = true
    }
  }, [debouncedSearchTerm, fetchOptions])

  return {
    options,
    isLoading,
    initialLabel
  }
}

export default useComboboxData
