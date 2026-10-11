import { CircleAlertIcon, LoaderIcon } from 'lucide-react'
import BrandMarkLoader from '~/components/brand/brand-mark-loader'
import { cn } from '~/shared/lib/cn'
import { ListingEmptyContent } from '~/components/ui/state-wrappers/listing-empty-content'
import {
  ListingEmptyInvite,
  type ListingEmptyInviteProps
} from '~/components/ui/state-wrappers/listing-empty-invite'
import useMessages, { useTranslatedError } from '~/i18n/useMessages'
import { isEmptyResultError } from '~/shared/lib/api/is-empty-result-error'

type Props = {
  isLoading: boolean
  /** True while a refetch is in flight (e.g. page/filter change). */
  isFetching?: boolean
  /** True when showing previous page/filter data via keepPreviousData. */
  isPlaceholderData?: boolean
  error?: Error | null
  total: number | undefined
  /** Replaces the default `floating-section` surface when data is present. */
  contentClassName?: string
  /** @deprecated Prefer `emptyInvite` for title, description and CTA */
  emptyMessage?: string
  emptyInvite?: ListingEmptyInviteProps
  children: React.ReactNode
}

/**
 * Centralized wrapper component for handling listing states (loading, error, empty)
 * Used across all listing/data table components
 *
 * Renders children when data is available, otherwise shows appropriate state
 */
const ListingState = ({
  isLoading,
  isFetching = false,
  isPlaceholderData = false,
  error,
  total,
  emptyMessage,
  emptyInvite,
  contentClassName,
  children
}: Props) => {
  const t = useMessages()
  const tError = useTranslatedError()
  const emptyResultMessage = t('global.no-records-found')
  const defaultEmptyInvite: ListingEmptyInviteProps = {
    title: t('global.empty-invite.title'),
    description: emptyMessage ?? t('global.empty-invite.description'),
    action: undefined
  }

  const renderEmpty = () => {
    const invite =
      emptyInvite ?? (emptyMessage ? undefined : defaultEmptyInvite)

    if (invite) {
      return <ListingEmptyInvite {...invite} />
    }

    return (
      <ListingEmptyContent message={emptyMessage ?? t('global.no-results')} />
    )
  }

  const isInitialLoad = isLoading && total === undefined
  const isUpdating = isFetching && isPlaceholderData && total !== undefined

  if (isInitialLoad) {
    return <BrandMarkLoader />
  }

  const updatingBanner = isUpdating ? (
    <p
      className='flex items-center gap-2 text-muted-foreground text-sm'
      aria-live='polite'
      data-slot='listing-updating'
    >
      <LoaderIcon className='size-3.5 animate-spin text-primary' aria-hidden />
      {t('global.updating')}
    </p>
  ) : null

  // Render children when data is available
  if (total) {
    return (
      <div className='flex w-full min-w-0 max-w-full flex-col gap-3'>
        {updatingBanner}
        <div
          className={cn(
            'w-full min-w-0 max-w-full *:min-w-0 *:max-w-full',
            'transition-opacity duration-200',
            isUpdating && 'opacity-70',
            contentClassName ?? 'floating-section grid'
          )}
          data-slot='listing-content'
        >
          {children}
        </div>
      </div>
    )
  }

  // Show state UI if error or empty
  let content = null

  if (error && isEmptyResultError(error.message)) {
    content = emptyInvite ? (
      <ListingEmptyInvite
        title={emptyInvite.title}
        description={emptyInvite.description ?? emptyResultMessage}
        action={emptyInvite.action}
      />
    ) : (
      <ListingEmptyContent message={emptyMessage ?? emptyResultMessage} />
    )
  } else if (error) {
    content = (
      <div
        className='flex flex-col items-center gap-3 text-center text-destructive'
        data-slot='listing-error'
      >
        <CircleAlertIcon className='size-12' strokeWidth={1.25} aria-hidden />
        <p className='max-w-md font-semibold text-base'>
          {tError(error.message)}
        </p>
      </div>
    )
  } else if (total === 0) {
    content = renderEmpty()
  }

  return (
    <div className='flex w-full flex-col gap-3'>
      {updatingBanner}
      <div
        className={cn(
          'w-full',
          'flex min-h-72 items-center justify-center py-10',
          'transition-opacity duration-200',
          isUpdating && 'opacity-70'
        )}
        data-slot='listing-state-container'
      >
        {content ? <div className='zaffiro-empty-panel'>{content}</div> : null}
      </div>
    </div>
  )
}

export default ListingState
