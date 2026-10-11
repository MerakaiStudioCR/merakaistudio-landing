import { cn } from '~/shared/lib/cn'

const SidebarGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  )
}

export const SidebarGroupLabel = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='sidebar-group-label'
      data-sidebar='group-label'
      className={cn(
        'mb-1 flex shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:sr-only',
        className
      )}
      {...props}
    />
  )
}

export const SidebarGroupContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='sidebar-group-content'
      data-sidebar='group-content'
      className={cn('w-full', className)}
      {...props}
    />
  )
}

export default SidebarGroup
