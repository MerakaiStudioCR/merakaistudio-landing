'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import useMessages from '~/i18n/useMessages'
import { cn } from '~/shared/lib/cn'

interface Props {
  appliedCount?: number
  children: React.ReactNode
}

const ListingFiltersCollapse = ({ appliedCount = 0, children }: Props) => {
  const t = useMessages('global')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='listing-filters-collapse'>
      <button
        type='button'
        className='flex w-full items-center justify-between font-medium text-primary text-sm xl:hidden'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className='flex items-center gap-2'>
          {t('filters')}
          {appliedCount > 0 ? (
            <span className='rounded-full bg-(--zaffiro-water-100) px-2 py-0.5 font-semibold text-(--accent-interaction) text-xs tabular-nums'>
              {appliedCount}
            </span>
          ) : null}
        </span>
        <ChevronDownIcon
          className={cn(
            'size-3 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'space-y-4 xl:block xl:pt-0',
          isOpen ? 'block pt-4' : 'hidden'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default ListingFiltersCollapse
