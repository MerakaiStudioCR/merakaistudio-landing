import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ListingState from './listing-state'

vi.mock('~/i18n/useMessages', () => ({
  default: () => (key: string) => key,
  useTranslatedError: () => (key: string) => key
}))

vi.mock('~/components/brand/brand-mark-loader', () => ({
  default: () => <div data-slot='brand-mark-loader'>loading</div>
}))

describe('ListingState', () => {
  afterEach(() => {
    cleanup()
  })

  it('shows the brand loader only on the first load', () => {
    render(
      <ListingState isLoading total={undefined}>
        <p>rows</p>
      </ListingState>
    )

    expect(screen.getByText('loading')).toBeTruthy()
    expect(screen.queryByText('rows')).toBeNull()
  })

  it('keeps listing content inside the page width', () => {
    render(
      <ListingState isLoading={false} total={1}>
        <p>rows</p>
      </ListingState>
    )

    expect(screen.getByText('rows').parentElement?.className).toContain(
      'min-w-0'
    )
  })

  it('keeps previous rows on background refetch of the same query', () => {
    render(
      <ListingState isLoading={false} isFetching total={8}>
        <p>rows</p>
      </ListingState>
    )

    expect(screen.getByText('rows')).toBeTruthy()
    expect(screen.queryByText('loading')).toBeNull()
    expect(screen.queryByText('global.updating')).toBeNull()
  })

  it('keeps previous rows and shows updating while filter data is placeholder', () => {
    render(
      <ListingState isLoading={false} isFetching isPlaceholderData total={8}>
        <p>rows</p>
      </ListingState>
    )

    expect(screen.getByText('rows')).toBeTruthy()
    expect(screen.queryByText('loading')).toBeNull()
    expect(screen.getByText('global.updating')).toBeTruthy()
    expect(screen.getByText('rows').parentElement?.className).toContain(
      'opacity-70'
    )
  })
})
