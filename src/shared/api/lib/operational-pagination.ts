import {
  PaginationApiSchema,
  normalizePaginationApiToDomain,
  type PaginationDto
} from '~/shared/api/types'

export const OPERATIONAL_DEFAULT_TAKE = 25
export const OPERATIONAL_MAX_TAKE = 200

const unwrapResult = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') return data
  const record = data as Record<string, unknown>
  if ('result' in record) return record.result
  return data
}

export interface OperationalPaginationParams {
  page?: number
  limit?: number
}

export interface ParsedPaginatedApiResult {
  rows: unknown[]
  pagination: PaginationDto
}

export const toSkipTake = ({
  page,
  limit
}: OperationalPaginationParams = {}): {
  skip: number
  take: number
  page: number
  limit: number
} => {
  const resolvedLimit = Math.min(
    Math.max(limit ?? OPERATIONAL_DEFAULT_TAKE, 1),
    OPERATIONAL_MAX_TAKE
  )
  const resolvedPage = Math.max(page ?? 1, 1)

  return {
    skip: (resolvedPage - 1) * resolvedLimit,
    take: resolvedLimit,
    page: resolvedPage,
    limit: resolvedLimit
  }
}

export const addSkipTakeParams = (
  url: URL,
  pagination: OperationalPaginationParams = {}
): void => {
  const { skip, take } = toSkipTake(pagination)
  url.searchParams.set('skip', String(skip))
  url.searchParams.set('take', String(take))
}

export const parsePaginatedApiResult = (
  data: unknown
): ParsedPaginatedApiResult => {
  const result = unwrapResult(data)

  if (Array.isArray(result)) {
    const total = result.length
    return {
      rows: result,
      pagination: {
        total,
        page: 1,
        limit: total,
        totalPages: total > 0 ? 1 : 0
      }
    }
  }

  if (!result || typeof result !== 'object') {
    return {
      rows: [],
      pagination: { total: 0, page: 1, limit: 0, totalPages: 0 }
    }
  }

  const record = result as Record<string, unknown>
  const rows = Array.isArray(record.data)
    ? record.data
    : Array.isArray(record.items)
      ? record.items
      : []

  const paginationRaw = record.pagination ?? {
    total: rows.length,
    page: 1,
    limit: rows.length,
    totalPages: rows.length > 0 ? 1 : 0
  }

  return {
    rows,
    pagination: normalizePaginationApiToDomain(
      PaginationApiSchema.parse(paginationRaw)
    )
  }
}

export async function fetchAllPaginatedPages<T>(
  fetchPage: (
    page: number,
    limit: number
  ) => Promise<{ items: T[]; pagination: PaginationDto }>
): Promise<T[]> {
  const allItems: T[] = []
  let page = 1
  const limit = OPERATIONAL_MAX_TAKE

  while (true) {
    const { items, pagination } = await fetchPage(page, limit)
    allItems.push(...items)

    if (page >= pagination.totalPages || items.length === 0) {
      break
    }

    page += 1
  }

  return allItems
}
