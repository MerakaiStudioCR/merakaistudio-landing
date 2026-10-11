import {
  defaultShouldDehydrateQuery,
  keepPreviousData,
  type Query
} from '@tanstack/react-query'

/** Stable reference / catalog data (meter types, countries, …). */
export const CATALOG_STALE_TIME = 10 * 60 * 1000

/** Operational list views (connections, invoices, readings, …). */
export const LISTING_STALE_TIME = 30 * 1000

/** Keep the previous page visible while filters or pagination refetch. */
export const LISTING_PLACEHOLDER_DATA = keepPreviousData

/** Entity detail views — always refetch when opened. */
export const DETAIL_STALE_TIME = 0

/** Session-scoped data (permissions, tenant context). */
export const SESSION_STALE_TIME = 60 * 1000

/** Access-package must stay short-lived so add-on attach/detach refresh features. */
export const ACCESS_PACKAGE_STALE_TIME = 10 * 1000

export const GC_TIME = 5 * 60 * 1000

/** Max age for persisted catalog queries in localStorage. */
export const QUERY_PERSIST_MAX_AGE = 15 * 60 * 1000

/** Bump when persisted query shape changes to invalidate old localStorage entries. */
export const QUERY_PERSIST_BUSTER = 'zaffiro-rq-v1'

const PERSISTABLE_QUERY_KEY_ROOTS = new Set([
  'rate-types',
  'meter-types',
  'pod-connector-types',
  'countries',
  'distribution-types',
  'document-types',
  'meter-statuses',
  'provinces',
  'cantons',
  'districts'
])

export const shouldPersistQuery = (query: Query): boolean => {
  const root = query.queryKey[0]
  return typeof root === 'string' && PERSISTABLE_QUERY_KEY_ROOTS.has(root)
}

/** Persist only successful catalog queries — pending/error states cannot be serialized. */
export const shouldDehydratePersistedQuery = (query: Query): boolean =>
  defaultShouldDehydrateQuery(query) && shouldPersistQuery(query)

export const defaultQueryOptions = {
  queries: {
    staleTime: LISTING_STALE_TIME,
    gcTime: GC_TIME,
    refetchOnWindowFocus: true
  }
} as const
