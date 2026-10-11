import type { LucideIcon } from 'lucide-react'
import StatusLabel from '~/components/ui/status'
import type { StatusVariants } from '~/components/ui/status/variants'
import SummaryStat, {
  type SummaryStatProps
} from '~/components/ui/entity-detail/summary-stat'
import { cn } from '~/shared/lib/cn'

export interface EntityDetailSummarySideCard {
  icon: LucideIcon
  label: string
  value: React.ReactNode
}

export interface EntityDetailSummaryProps {
  label: string
  title: React.ReactNode
  subtitle?: string
  status?: {
    variant: NonNullable<StatusVariants['variant']>
    label: string
  }
  sideCard?: EntityDetailSummarySideCard
  leading?: React.ReactNode
  stats?: SummaryStatProps[]
  className?: string
}

const EntityDetailSummary = ({
  label,
  title,
  subtitle,
  status,
  sideCard,
  leading,
  stats,
  className
}: EntityDetailSummaryProps) => (
  <section className={cn('floating-section overflow-hidden', className)}>
    <div className='border-border border-b bg-linear-to-br from-accent/80 via-light-background to-light-background p-4 sm:p-5'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div className='flex min-w-0 items-start gap-4'>
          {leading ? <div className='shrink-0'>{leading}</div> : null}
          <div className='min-w-0 space-y-2'>
            <p className='font-medium text-primary text-xs uppercase tracking-wide'>
              {label}
            </p>
            <div className='flex flex-wrap items-center gap-3'>
              <h2 className='font-semibold text-2xl text-foreground tracking-tight'>
                {title}
              </h2>
              {status ? (
                <StatusLabel variant={status.variant} label={status.label} />
              ) : null}
            </div>
            {subtitle ? (
              <p className='max-w-2xl text-muted-foreground text-sm'>
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {sideCard ? (
          <div className='flex min-w-0 items-center gap-3 rounded-lg border border-border bg-light-background px-4 py-3 shadow-sm'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'>
              <sideCard.icon className='size-5' aria-hidden />
            </div>
            <div className='min-w-0'>
              <p className='text-muted-foreground text-xs'>{sideCard.label}</p>
              <div className='min-w-0 font-medium text-foreground'>
                {sideCard.value}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>

    {stats && stats.length > 0 ? (
      <div
        className={cn(
          'grid gap-3 p-4 sm:grid-cols-2 sm:p-5',
          stats.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
        )}
      >
        {stats.map((stat) => (
          <SummaryStat key={stat.label} {...stat} />
        ))}
      </div>
    ) : null}
  </section>
)

export default EntityDetailSummary
