'use client'

import { useMemo } from 'react'
import Accordion from '~/components/ui/accordion'
import FilterBuilder from './filter-builder'
import FilterFormActions from './filter-form-actions'
import ListingFiltersCollapse from './listing-filters-collapse'
import useMessages from '~/i18n/useMessages'
import useFormSubmit from '~/shared/hooks/useFormSubmit'
import useFilters from './hooks/useFilters'
import useQueryParams from './hooks/useQueryParams'
import { serializeFiltersToUrl } from './utils/url-serialization'
import { transformFormDataToState } from './utils/form-transformer'
import { countAppliedFilters } from './lib/count-applied-filters'
import { cn } from '~/shared/lib/cn'
import type { FilterConfig } from './types'

interface Props {
  onSubmit?: (filters: Record<string, string>) => void
  onReset?: () => void
  /** Equal columns for a 3-field row plus a date row with actions. */
  columns?: 3 | 4
}

const isAdvancedFilter = (cfg: FilterConfig) => cfg.section === 'advanced'

const isPrimaryRow = (cfg: FilterConfig, row: 1 | 2) =>
  !isAdvancedFilter(cfg) && (cfg.primaryRow ?? 1) === row

const FiltersManager = ({ onSubmit, onReset, columns = 4 }: Props) => {
  const t = useMessages('global')
  const {
    filters,
    schema,
    defaults,
    managedKeys,
    activeFilters,
    setActiveFilters
  } = useFilters()
  const { syncQueryParams } = useQueryParams()

  const { primaryRowOne, primaryRowTwo, advancedFilters } = useMemo(
    () => ({
      primaryRowOne: filters.filter((cfg) => isPrimaryRow(cfg, 1)),
      primaryRowTwo: filters.filter((cfg) => isPrimaryRow(cfg, 2)),
      advancedFilters: filters.filter(isAdvancedFilter)
    }),
    [filters]
  )

  const { onFormSubmit, getError } = useFormSubmit<Record<string, unknown>>({
    schema,
    persistKey: false,
    onSubmit: (parsed) => {
      const state = transformFormDataToState(filters, parsed)
      const serialized = serializeFiltersToUrl(filters, state)

      setActiveFilters(state)
      syncQueryParams(serialized, [...managedKeys, 'page'])
      onSubmit?.(serialized)
    }
  })

  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const form = e?.currentTarget?.form as HTMLFormElement | null
    form?.reset()

    setActiveFilters({})
    syncQueryParams({}, [...managedKeys, 'page'])
    onSubmit?.({})
    onReset?.()
  }

  const renderField = (cfg: FilterConfig) => {
    const error = getError(cfg.key)
    if (error) {
      mk_debug.error('Rendering filter', { error })
    }

    return (
      <div key={cfg.key} className={cn('w-full min-w-0', cfg.wrapperClass)}>
        <FilterBuilder config={cfg} value={defaults[cfg.key]} />
      </div>
    )
  }

  const filterActions = <FilterFormActions onReset={handleReset} />
  const hasRowTwo = primaryRowTwo.length > 0
  const showActionsWithRowOne = primaryRowOne.length > 0 && !hasRowTwo
  const appliedCount = countAppliedFilters(filters, activeFilters)

  return (
    <form
      onSubmit={onFormSubmit}
      className={cn(
        'floating-section listing-filters',
        columns === 3 && 'listing-filters--thirds'
      )}
      data-slot='filters'
    >
      <ListingFiltersCollapse appliedCount={appliedCount}>
        {primaryRowOne.length > 0 ? (
          <div
            className={cn(
              'listing-filters__row',
              showActionsWithRowOne && 'listing-filters__row--actions'
            )}
          >
            {primaryRowOne.map(renderField)}
            {showActionsWithRowOne ? filterActions : null}
          </div>
        ) : null}

        {hasRowTwo ? (
          <div className='listing-filters__row listing-filters__row--actions'>
            {primaryRowTwo.map(renderField)}
            {filterActions}
          </div>
        ) : null}

        {advancedFilters.length > 0 ? (
          <Accordion
            type='single'
            collapsible
            className='border-border border-t pt-2'
          >
            <Accordion.Item value='advanced' className='border-0'>
              <Accordion.Trigger className='py-2 font-medium text-primary text-sm hover:no-underline'>
                {t('advanced-filters')}
              </Accordion.Trigger>
              <Accordion.Content>
                <div className='listing-filters__row listing-filters__row--advanced pb-2'>
                  {advancedFilters.map(renderField)}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        ) : null}
      </ListingFiltersCollapse>
    </form>
  )
}

export default FiltersManager
