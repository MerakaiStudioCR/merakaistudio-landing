import type { LucideIcon } from 'lucide-react'
import {
  DetailInfoField,
  detailInfoRowClassName,
  displayDetailValue
} from '~/components/ui/detail-info'
import { cn } from '~/shared/lib/cn'

interface FormReviewPreviewProps {
  children: React.ReactNode
  className?: string
}

export const FormReviewPreview = ({
  children,
  className
}: FormReviewPreviewProps) => (
  <div className={cn('floating-section p-4 sm:p-6', className)}>
    <div className='divide-y divide-border'>{children}</div>
  </div>
)

interface FormReviewSectionProps {
  title?: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  description?: string
  layout?: 'grid' | 'stack'
  /** Skip inner bordered panel (e.g. stat cards, tables). */
  unwrapped?: boolean
}

export const FormReviewSection = ({
  title,
  icon: Icon,
  children,
  className,
  description,
  layout = 'grid',
  unwrapped = false
}: FormReviewSectionProps) => (
  <section className={cn('py-5 first:pt-0 last:pb-0', className)}>
    {title ? (
      <header className='mb-4 flex items-start gap-3'>
        {Icon ? (
          <div
            aria-hidden
            className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'
          >
            <Icon className='size-4' />
          </div>
        ) : null}
        <div className='min-w-0 space-y-1'>
          <h4 className='font-semibold text-foreground text-sm'>{title}</h4>
          {description ? (
            <p className='text-muted-foreground text-sm'>{description}</p>
          ) : null}
        </div>
      </header>
    ) : null}
    {layout === 'grid' ? (
      <div className={detailInfoRowClassName}>{children}</div>
    ) : unwrapped ? (
      <div className='flex flex-col gap-4'>{children}</div>
    ) : (
      <div className='space-y-4 rounded-lg border border-border bg-light-background p-4 sm:p-5'>
        {children}
      </div>
    )}
  </section>
)

interface FormReviewItemProps {
  label: string
  value?: React.ReactNode
  className?: string
  size?: 'default' | 'auto'
}

export const FormReviewItem = ({
  label,
  value,
  className,
  size = 'default'
}: FormReviewItemProps) => (
  <DetailInfoField
    className={cn('col-span-12 md:col-span-6', className)}
    label={label}
    size={size}
    value={
      typeof value === 'string' || value == null
        ? displayDetailValue(value ?? undefined)
        : value
    }
  />
)

export { FormReviewLocationBlock } from './form-review-location-block'
