'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const

const PAGE_PARAM = 'page'
const LIMIT_PARAM = 'limit'

interface UsePaginationOptions {
  limit?: number
  pageSizeOptions?: readonly number[]
}

interface PaginationProps {
  total: number
  current: number
  onPageChange: (page: number) => void
}

interface UsePaginationReturn {
  page: number
  limit: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  getPaginationProps: (totalPages: number) => PaginationProps | null
}

const parsePositiveInt = (value: string | null, fallback: number): number => {
  if (!value) return fallback
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed
}

/**
 * Hook for managing pagination state synced with URL
 */
const usePagination = ({
  limit: defaultLimit = DEFAULT_LIMIT,
  pageSizeOptions = PAGE_SIZE_OPTIONS
}: UsePaginationOptions = {}): UsePaginationReturn => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = useMemo(
    () => parsePositiveInt(searchParams?.get(PAGE_PARAM) ?? null, DEFAULT_PAGE),
    [searchParams]
  )

  const limit = useMemo(() => {
    const parsed = parsePositiveInt(
      searchParams?.get(LIMIT_PARAM) ?? null,
      defaultLimit
    )
    return pageSizeOptions.includes(parsed) ? parsed : defaultLimit
  }, [searchParams, defaultLimit, pageSizeOptions])

  const replaceSearchParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const current = new URLSearchParams(searchParams?.toString())
      mutate(current)
      const queryString = current.toString()
      router.replace(queryString ? `${pathname}?${queryString}` : pathname)
    },
    [pathname, router, searchParams]
  )

  const setPage = useCallback(
    (newPage: number) => {
      replaceSearchParams((current) => {
        if (newPage <= 1) {
          current.delete(PAGE_PARAM)
        } else {
          current.set(PAGE_PARAM, String(newPage))
        }
      })
    },
    [replaceSearchParams]
  )

  const setLimit = useCallback(
    (newLimit: number) => {
      if (!pageSizeOptions.includes(newLimit)) return

      replaceSearchParams((current) => {
        if (newLimit === defaultLimit) {
          current.delete(LIMIT_PARAM)
        } else {
          current.set(LIMIT_PARAM, String(newLimit))
        }
        current.delete(PAGE_PARAM)
      })
    },
    [defaultLimit, pageSizeOptions, replaceSearchParams]
  )

  const getPaginationProps = useCallback(
    (totalPages: number): PaginationProps | null => {
      if (totalPages <= 1) {
        return null
      }

      return {
        total: totalPages,
        current: page,
        onPageChange: setPage
      }
    },
    [page, setPage]
  )

  return {
    page,
    limit,
    setPage,
    setLimit,
    getPaginationProps
  }
}

export default usePagination
