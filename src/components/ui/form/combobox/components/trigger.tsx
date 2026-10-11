'use client'

import { ChevronsUpDown } from 'lucide-react'
import Popover from '~/components/ui/popover'
import Button from '~/components/ui/button'
import useMessages from '~/i18n/useMessages'
import useComboboxContext from '../hooks/useComboboxContext'
import { cn } from '~/shared/lib/cn'
import type { ComboboxTriggerProps } from '../types'

const ComboboxTrigger = ({
  placeholder,
  className,
  id,
  'aria-invalid': ariaInvalid
}: ComboboxTriggerProps) => {
  const t = useMessages('combobox')
  const { value, selectedLabel } = useComboboxContext()

  const hasValue = !!value && !!selectedLabel
  const hasError = ariaInvalid === 'true'

  return (
    <Popover.Trigger asChild>
      {/* biome-ignore lint/a11y/useSemanticElements: combobox is standard ARIA pattern */}
      <Button
        id={id}
        variant='outline'
        role='combobox'
        aria-invalid={ariaInvalid}
        className={cn(
          'w-full bg-white font-normal hover:bg-white [&>span]:justify-start',
          hasError && 'border-destructive',
          className
        )}
      >
        <span className={cn('truncate', !hasValue && 'text-muted-foreground')}>
          {hasValue ? selectedLabel : placeholder || t('placeholder')}
        </span>
        <ChevronsUpDown className='ml-auto size-4 shrink-0' />
      </Button>
    </Popover.Trigger>
  )
}

export default ComboboxTrigger
