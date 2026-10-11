'use client'

import { usePrefetchListings } from '~/shared/hooks/usePrefetchListings'

/**
 * Extension point for domain listings.
 * Register prefetch configs here when a domain is added.
 */
const PrefetchInitializer = () => {
  usePrefetchListings([])
  return null
}

export default PrefetchInitializer
