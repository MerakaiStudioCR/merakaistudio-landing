import { useMemo } from 'react'
import useFilters from './useFilters'

/**
 * Custom hook to transform activeFilters to domain-specific typed filters
 *
 * @template T - The type of the domain-specific filters
 * @param transformer - Function that transforms activeFilters to typed filters
 * @returns Typed filters object
 *
 * @example
 * ```typescript
 * const filters = useTypedFilters(transformReadingFilters)
 * const { data } = useReadings({ filters })
 * ```
 */
const useTypedFilters = <T>(
  transformer: (activeFilters: Record<string, unknown>) => T
): T => {
  const { activeFilters } = useFilters()

  return useMemo(() => transformer(activeFilters), [activeFilters, transformer])
}

export default useTypedFilters
