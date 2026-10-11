'use client'

import { XIcon } from 'lucide-react'
import useMessages from '~/i18n/useMessages'
import { cn } from '~/shared/lib/cn'
import DialogCancel from './dialog-cancel'

interface DialogCloseButtonProps {
  label?: string
  className?: string
}

const DialogCloseButton = ({ label, className }: DialogCloseButtonProps) => {
  const t = useMessages()
  const ariaLabel = label ?? t('global.close')

  return (
    <DialogCancel asChild>
      <button
        type='button'
        aria-label={ariaLabel}
        className={cn(
          'absolute top-3 right-3 flex size-9 items-center justify-center rounded-full',
          'border-2 border-destructive/45 bg-destructive/8 text-destructive',
          'shadow-destructive/10 shadow-sm',
          'transition-all duration-200',
          'hover:border-destructive hover:bg-destructive hover:text-light-foreground hover:shadow-destructive/25 hover:shadow-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40 focus-visible:ring-offset-2',
          'active:scale-95',
          className
        )}
      >
        <XIcon className='size-4' strokeWidth={2.5} aria-hidden />
      </button>
    </DialogCancel>
  )
}

export default DialogCloseButton
