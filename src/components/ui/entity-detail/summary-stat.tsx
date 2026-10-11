import type { LucideIcon } from 'lucide-react'
import { cn } from '~/shared/lib/cn'

export interface SummaryStatProps {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  className?: string
}

const SummaryStat = ({
  icon: Icon,
  label,
  value,
  className
}: SummaryStatProps) => (
  <div
    className={cn(
      'flex min-w-0 items-start gap-3 rounded-lg border border-border bg-light-background p-3 shadow-sm',
      className
    )}
  >
    <div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-brand-interaction'>
      <Icon className='size-4' aria-hidden />
    </div>
    <div className='min-w-0 space-y-0.5'>
      <p className='text-muted-foreground text-xs'>{label}</p>
      <div className='truncate font-medium text-foreground text-sm'>
        {value}
      </div>
    </div>
  </div>
)

export default SummaryStat
