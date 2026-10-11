'use client'

import Button from '~/components/ui/button'
import useMessages from '~/i18n/useMessages'

interface Props {
  onReset: (e?: React.MouseEvent<HTMLButtonElement>) => void
  clearLabel?: string
  submitLabel?: string
  submitKey?: 'apply' | 'search'
}

const FilterFormActions = ({
  onReset,
  clearLabel,
  submitLabel,
  submitKey = 'apply'
}: Props) => {
  const t = useMessages('global')

  const resolvedClearLabel = clearLabel ?? t('clear-filters')
  const resolvedSubmitLabel = submitLabel ?? t(submitKey)

  return (
    <div className='listing-filters__actions-field'>
      <div className='flex flex-col gap-2'>
        <span
          className='pointer-events-none hidden select-none font-medium sm:invisible sm:block'
          aria-hidden='true'
        >
          &nbsp;
        </span>
        <div className='listing-filters__actions'>
          <Button
            variant='secondary'
            type='button'
            onClick={onReset}
            data-slot='filters-reset'
            className='listing-filters__action'
          >
            {resolvedClearLabel}
          </Button>
          <Button
            variant='primary'
            type='submit'
            data-slot='filters-submit'
            className='listing-filters__action'
          >
            {resolvedSubmitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterFormActions
