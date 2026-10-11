import type { UseQueryResult } from '@tanstack/react-query'

export interface QueryViewState {
  isLoading: boolean
  isFetching: boolean
  isPlaceholderData: boolean
  error: Error | null
}

export const pickQueryViewState = <T>(
  query: Pick<
    UseQueryResult<T>,
    'isLoading' | 'isFetching' | 'isPlaceholderData' | 'error'
  >
): QueryViewState => ({
  isLoading: query.isLoading,
  isFetching: query.isFetching,
  isPlaceholderData: query.isPlaceholderData,
  error: query.error
})
