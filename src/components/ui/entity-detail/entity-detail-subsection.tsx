import type { LucideIcon } from 'lucide-react'

export interface EntityDetailSubsectionProps {
  icon: LucideIcon
  title: string
  description?: string
  aside?: React.ReactNode
  children: React.ReactNode
  /** When true, children render without the inner bordered panel (e.g. full-width tables). */
  unwrapped?: boolean
}

const EntityDetailSubsection = ({
  icon: Icon,
  title,
  description,
  aside,
  children,
  unwrapped = false
}: EntityDetailSubsectionProps) => (
  <section className='min-w-0 space-y-4'>
    <header className='flex flex-wrap items-start justify-between gap-3'>
      <div className='flex min-w-0 items-start gap-3'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <Icon className='size-5' aria-hidden />
        </div>
        <div className='min-w-0 space-y-1'>
          <h3 className='font-semibold text-base text-foreground'>{title}</h3>
          {description ? (
            <p className='text-muted-foreground text-sm'>{description}</p>
          ) : null}
        </div>
      </div>
      {aside ? <div className='flex shrink-0 items-center'>{aside}</div> : null}
    </header>

    {unwrapped ? (
      children
    ) : (
      <div className='space-y-5 rounded-lg border border-border bg-light-background p-4'>
        {children}
      </div>
    )}
  </section>
)

export default EntityDetailSubsection
