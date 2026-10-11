'use client'

import { SearchXIcon, TriangleAlertIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import BrandMarkLoader from '~/components/brand/brand-mark-loader'
import useMessages from '~/i18n/useMessages'
import { isEmptyResultError } from '~/shared/lib/api/is-empty-result-error'

type Props<T> = {
  isLoading: boolean
  isFetching?: boolean
  isPlaceholderData?: boolean
  error?: Error | null
  data: T | undefined | null
  children: (data: T) => React.ReactNode
}

/**
 * Wrapper for detail / edit pages.
 * - No data + error → 404.
 * - Cached data + refetch error → render data with a stale-data banner.
 * - Loading without stable data → brand mark loader.
 */
const DataState = <T,>({
  isLoading,
  isFetching = false,
  isPlaceholderData = false,
  error,
  data,
  children
}: Props<T>) => {
  const t = useMessages()

  const awaitingStableData =
    !error &&
    (isLoading ||
      data === undefined ||
      data === null ||
      (isFetching && isPlaceholderData))

  if (error && !data) {
    if (isEmptyResultError(error.message)) {
      return (
        <div
          className='floating-section flex min-h-64 w-full flex-col items-center justify-center gap-3 px-4 text-center'
          data-slot='data-empty'
        >
          <SearchXIcon
            className='size-12 text-muted-foreground/70'
            strokeWidth={1.25}
            aria-hidden
          />
          <p className='max-w-md text-base text-muted-foreground'>
            {t('global.no-records-found')}
          </p>
        </div>
      )
    }

    return notFound()
  }

  if (awaitingStableData) {
    return <BrandMarkLoader />
  }

  if (!data) return null

  return (
    <>
      {error && (
        <output className='mt-4 flex items-center gap-2 rounded-md border border-warning/40 bg-warning/10 px-4 py-2 text-sm'>
          <TriangleAlertIcon className='size-4 shrink-0' />
          <span>{t('global.refresh-error')}</span>
        </output>
      )}
      {children(data)}
    </>
  )
}

export default DataState
