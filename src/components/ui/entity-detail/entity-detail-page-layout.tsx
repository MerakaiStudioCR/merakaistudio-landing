import { cn } from '~/shared/lib/cn'

interface EntityDetailPageLayoutProps {
  header: React.ReactNode
  summary?: React.ReactNode
  main: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const EntityDetailPageLayout = ({
  header,
  summary,
  main,
  aside,
  footer,
  className
}: EntityDetailPageLayoutProps) => (
  <div className={cn('view flex flex-col gap-6', className)}>
    {header}
    {summary}
    {aside ? (
      <div className='grid gap-6 xl:grid-cols-3'>
        <div className='flex flex-col gap-6 xl:col-span-2'>{main}</div>
        <div className='flex flex-col gap-6'>{aside}</div>
      </div>
    ) : (
      main
    )}
    {footer}
  </div>
)

export default EntityDetailPageLayout
