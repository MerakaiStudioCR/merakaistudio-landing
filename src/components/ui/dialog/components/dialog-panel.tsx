'use client'

import { cn } from '~/shared/lib/cn'
import DialogCloseButton from './dialog-close-button'
import DialogContent from './dialog-content'
import DialogDescription from './dialog-description'
import DialogHeader from './dialog-header'
import DialogTitle from './dialog-title'

const PANEL_SIZE_CLASSES = {
  sm: 'sm:max-w-lg',
  md: 'md:max-w-2xl',
  lg: 'md:max-w-3xl',
  xl: 'md:max-w-4xl'
} as const

type DialogPanelSize = keyof typeof PANEL_SIZE_CLASSES

interface DialogPanelProps {
  title?: React.ReactNode
  description?: React.ReactNode
  descriptionClassName?: string
  footer?: React.ReactNode
  size?: DialogPanelSize
  showCloseButton?: boolean
  closeLabel?: string
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}

const DialogPanel = ({
  title,
  description,
  descriptionClassName,
  footer,
  size = 'md',
  showCloseButton = true,
  closeLabel,
  className,
  bodyClassName,
  children
}: DialogPanelProps) => {
  const hasHeader = title != null || description != null || showCloseButton

  return (
    <DialogContent
      className={cn(
        'flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg',
        PANEL_SIZE_CLASSES[size],
        className
      )}
    >
      {hasHeader ? (
        <div className='relative shrink-0 border-border border-b px-6 py-4 pr-14'>
          {title != null || description != null ? (
            <DialogHeader className='text-left'>
              {title != null ? <DialogTitle>{title}</DialogTitle> : null}
              {description != null ? (
                <DialogDescription className={descriptionClassName}>
                  {description}
                </DialogDescription>
              ) : null}
            </DialogHeader>
          ) : null}
          {showCloseButton ? <DialogCloseButton label={closeLabel} /> : null}
        </div>
      ) : null}

      {children != null ? (
        <div className={cn('flex-1 overflow-y-auto px-6 py-4', bodyClassName)}>
          {children}
        </div>
      ) : null}

      {footer != null ? (
        <div className='shrink-0 border-border border-t px-6 py-4'>
          {footer}
        </div>
      ) : null}
    </DialogContent>
  )
}

export default DialogPanel
export type { DialogPanelProps, DialogPanelSize }
