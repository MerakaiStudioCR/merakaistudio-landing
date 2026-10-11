import { statusVariants } from './variants'
import { cn } from '~/shared/lib/cn'
import type { VariantProps } from 'class-variance-authority'

const badgeToneClasses = {
  success: 'bg-[color-mix(in_srgb,var(--success)_12%,white)] text-success',
  warning:
    'bg-[color-mix(in_srgb,var(--warning)_15%,white)] text-[color-mix(in_srgb,var(--warning)_75%,var(--zaffiro-ink))]',
  destructive:
    'bg-[color-mix(in_srgb,var(--destructive)_12%,white)] text-destructive',
  info: 'bg-[color-mix(in_srgb,var(--info)_12%,white)] text-info'
} as const

type Props = VariantProps<typeof statusVariants> & {
  label: string
  className?: string
}

const StatusLabel = ({ variant = 'success', label, className }: Props) => {
  const resolvedVariant = variant ?? 'success'

  return (
    <span
      data-slot='status-label'
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-xs uppercase tracking-wide',
        badgeToneClasses[resolvedVariant],
        className
      )}
    >
      <span
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          statusVariants({ variant: resolvedVariant })
        )}
        aria-hidden
      />
      {label}
    </span>
  )
}

export default StatusLabel
