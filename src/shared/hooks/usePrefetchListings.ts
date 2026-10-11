'use client'

import { useEffect, useRef } from 'react'
import { useQueryClient, type QueryClient } from '@tanstack/react-query'
import { CATALOG_STALE_TIME } from '~/shared/lib/react-query/query-config'

export interface PrefetchConfig {
  queryKey: readonly unknown[]
  queryFn: () => Promise<unknown>
  staleTime?: number
}

const scheduleIdleTask = (callback: () => void): void => {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(callback, { timeout: 2000 })
  } else {
    setTimeout(callback, 100)
  }
}

const executePrefetch = async (
  queryClient: QueryClient,
  config: PrefetchConfig
): Promise<void> => {
  try {
    await queryClient.prefetchQuery({
      queryKey: config.queryKey,
      queryFn: config.queryFn,
      staleTime: config.staleTime ?? CATALOG_STALE_TIME
    })
  } catch {
    // Best-effort warmup; the owning hook retries when the view mounts.
  }
}

export const usePrefetchListings = (configs: PrefetchConfig[]): void => {
  const queryClient = useQueryClient()
  const hasPrefetched = useRef(false)

  useEffect(() => {
    if (configs.length === 0) {
      hasPrefetched.current = false
      return
    }

    if (hasPrefetched.current) return
    hasPrefetched.current = true

    scheduleIdleTask(() => {
      for (const config of configs) {
        executePrefetch(queryClient, config)
      }
    })
  }, [queryClient, configs])
}
