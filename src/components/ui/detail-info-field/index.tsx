import { cn } from '~/shared/lib/cn'

export const detailInfoRowClassName =
  'grid grid-cols-12 items-start gap-x-4 gap-y-5'

/** Wraps multiple {@link detailInfoRowClassName} rows so the next row's label clears the row above. */
export const detailInfoFieldsStackClassName = 'flex flex-col gap-5'

interface DetailInfoFieldProps {
  label: string
  value?: React.ReactNode
  className?: string
  labelClassName?: string
  /** `default` = fixed height box; `auto` = grows for longer content */
  size?: 'default' | 'auto'
  /** `boxed` = input-like surface; `plain` = typography-only read display */
  variant?: 'boxed' | 'plain'
  /** Stronger value weight for key metrics (mainly with `plain`) */
  emphasis?: boolean
  /** Soft chip behind the value (only with `variant="plain"`) */
  valueSurface?: boolean
}

const valueBoxClassName =
  'flex w-full items-center justify-start overflow-hidden rounded-lg border border-border bg-light-background px-4 text-sm leading-normal text-foreground shadow-[0_1px_2px_color-mix(in_srgb,var(--foreground)_6%,transparent)] [&_a]:inline [&_a]:h-auto [&_a]:min-h-0 [&_a]:max-w-full [&_a]:truncate [&_a]:py-0 [&_a]:leading-normal [&_a]:font-medium [&_a]:text-brand-interaction [&_a]:hover:text-primary [&_a]:hover:underline'

const valuePlainClassName =
  'min-w-0 text-foreground [&_a]:inline [&_a]:font-medium [&_a]:text-brand-interaction [&_a]:hover:text-primary [&_a]:hover:underline'

const valueSurfaceClassName =
  'inline-flex max-w-full rounded-md bg-muted/60 px-2.5 py-1.5 tabular-nums'

const DetailInfoField = ({
  label,
  value,
  className,
  labelClassName,
  size = 'default',
  variant = 'boxed',
  emphasis = false,
  valueSurface = false
}: DetailInfoFieldProps) => {
  if (variant === 'plain') {
    return (
      <div className={cn('flex min-w-0 flex-col gap-1', className)}>
        <span
          className={cn(
            'block truncate text-muted-foreground text-sm leading-tight',
            labelClassName
          )}
        >
          {label}
        </span>
        <div
          className={cn(
            valuePlainClassName,
            valueSurface && valueSurfaceClassName,
            emphasis
              ? 'font-semibold text-lg leading-snug'
              : 'font-medium text-base leading-normal'
          )}
        >
          {value ?? '-'}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex min-w-0 flex-col gap-1', className)}>
      <span
        className={cn(
          'block truncate text-foreground text-sm leading-tight',
          labelClassName
        )}
      >
        {label}:
      </span>
      <div
        className={cn(
          valueBoxClassName,
          size === 'default' ? 'h-11' : 'min-h-11 py-2.5'
        )}
      >
        <div
          className={cn(
            'flex min-h-0 w-full min-w-0 items-center',
            size === 'default' && 'truncate'
          )}
        >
          {value ?? '-'}
        </div>
      </div>
    </div>
  )
}

export default DetailInfoField
