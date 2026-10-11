/**
 * Shared types for the API layer
 */

import { z } from 'zod'

export type RequestOptions = RequestInit & { url: string }

export type RequestInterceptor = (
  options: RequestOptions
) => Promise<RequestOptions> | RequestOptions

export type ResponseInterceptor = (
  response: Response
) => Promise<Response> | Response

export interface ApiClientConfig {
  baseUrl?: string
  timeout?: number
  defaultHeaders?: HeadersInit
}

// Shared pagination types for API responses
export const PaginationDtoSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})

export type PaginationDto = z.infer<typeof PaginationDtoSchema>

/** Legacy list shape or Payment API skip/take shape (API_INTEGRATION §4 / §6.3) */
const PaginationLegacyApiSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})

const PaginationSkipTakeApiSchema = z.object({
  total: z.number(),
  skip: z.number().optional(),
  take: z.number().optional()
})

export const PaginationApiSchema = z.union([
  PaginationLegacyApiSchema,
  PaginationSkipTakeApiSchema
])

export type PaginationApi = z.infer<typeof PaginationApiSchema>

export function normalizePaginationApiToDomain(
  raw: PaginationApi
): PaginationDto {
  if ('page' in raw) {
    return {
      total: raw.total,
      page: raw.page,
      limit: raw.limit,
      totalPages: raw.totalPages
    }
  }

  const take = raw.take
  const skip = raw.skip ?? 0

  if (take !== undefined && take > 0) {
    return {
      total: raw.total,
      page: Math.floor(skip / take) + 1,
      limit: take,
      totalPages: Math.max(1, Math.ceil(raw.total / take))
    }
  }

  return {
    total: raw.total,
    page: 1,
    limit: raw.total > 0 ? raw.total : 0,
    totalPages: 1
  }
}

// Domain pagination type (same structure, can be customized per domain if needed)
export type Pagination = PaginationDto
