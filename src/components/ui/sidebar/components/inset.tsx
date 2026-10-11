import { cn } from '~/shared/lib/cn'

const SidebarInset = ({
  className,
  ...props
}: React.ComponentProps<'main'>) => (
  <main
    data-slot='sidebar-inset'
    data-feature-loader-host
    className={cn(
      'relative flex min-h-0 min-w-0 flex-1 flex-col bg-light-background',
      className
    )}
    {...props}
  />
)

export default SidebarInset
