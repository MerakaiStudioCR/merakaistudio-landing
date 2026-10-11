'use client'

import { QueryClient } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import {
  defaultQueryOptions,
  QUERY_PERSIST_BUSTER,
  QUERY_PERSIST_MAX_AGE,
  shouldDehydratePersistedQuery
} from '~/shared/lib/react-query/query-config'

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions
})

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: 'zaffiro-react-query'
})

export const queryPersistOptions = {
  persister: asyncStoragePersister,
  maxAge: QUERY_PERSIST_MAX_AGE,
  buster: QUERY_PERSIST_BUSTER,
  dehydrateOptions: {
    shouldDehydrateQuery: shouldDehydratePersistedQuery
  }
} as const

export async function clearQueryCache(): Promise<void> {
  queryClient.clear()
  await asyncStoragePersister.removeClient()
}

/**
 * Clears cached queries when switching tenant, but keeps the authenticated
 * user so AuthGuard / select-asada do not treat the transition as a logout.
 */
export async function clearTenantScopedQueryCache(): Promise<void> {
  queryClient.removeQueries({
    predicate: (query) => query.queryKey[0] !== 'currentUser'
  })
  await asyncStoragePersister.removeClient()
}

/** Clears in-memory queries when switching ASADA within the same tenant. */
export function clearInMemoryQueryCache(): void {
  queryClient.removeQueries({
    predicate: (query) => query.queryKey[0] !== 'currentUser'
  })
}
