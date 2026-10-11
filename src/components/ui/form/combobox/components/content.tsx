'use client'

import Popover from '~/components/ui/popover'
import Command from '~/components/ui/command'
import Loader from '~/components/ui/loader'
import useMessages from '~/i18n/useMessages'
import useComboboxContext from '../hooks/useComboboxContext'
import ComboboxItem from './item'
import { cn } from '~/shared/lib/cn'
import type { ComboboxContentProps, ComboboxOption } from '../types'

const ComboboxContent = <T = unknown>({
  children,
  emptyMessage,
  className
}: ComboboxContentProps<T>) => {
  const t = useMessages()
  const { options, isLoading, searchTerm, setSearchTerm } =
    useComboboxContext<T>()

  const showLoading = isLoading && searchTerm.trim() !== ''
  const showEmpty =
    !isLoading && options.length === 0 && searchTerm.trim() !== ''

  return (
    <Popover.Content
      align='start'
      style={{ width: 'var(--radix-popover-trigger-width)' }}
      className={cn('p-0', className)}
    >
      <Command shouldFilter={false}>
        <Command.Input
          placeholder={t('combobox.search')}
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <Command.List>
          {showLoading && (
            <Loader className='p-2 px-3' message='global.loading' />
          )}
          {showEmpty && (
            <span className='block p-2 px-3 text-muted-foreground text-sm'>
              {emptyMessage ? t(emptyMessage) : t('combobox.no-results')}
            </span>
          )}
          {!showLoading && options.length > 0 && (
            <Command.Group>
              {options.map((option) =>
                children ? (
                  <ComboboxItem key={String(option.value)} option={option}>
                    {children(option as ComboboxOption<T>)}
                  </ComboboxItem>
                ) : (
                  <ComboboxItem key={String(option.value)} option={option} />
                )
              )}
            </Command.Group>
          )}
        </Command.List>
      </Command>
    </Popover.Content>
  )
}

export default ComboboxContent
