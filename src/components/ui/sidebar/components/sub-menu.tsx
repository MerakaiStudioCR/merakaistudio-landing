import { Slot } from '@radix-ui/react-slot'
import { cn } from '~/shared/lib/cn'

const SidebarMenuSub = ({
  className,
  ...props
}: React.ComponentProps<'ul'>) => {
  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-white/15 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  )
}

export const SidebarMenuSubItem = ({
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot='sidebar-menu-sub-item'
      data-sidebar='menu-sub-item'
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  )
}

export const SidebarMenuSubButton = ({
  asChild = false,
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
  isActive?: boolean
}) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      data-slot='sidebar-menu-sub-button'
      data-sidebar='menu-sub-button'
      data-active={isActive}
      className={cn(
        '-translate-x-px flex h-auto min-h-7 min-w-0 items-center gap-2 rounded-md px-2 py-1 text-left text-sm leading-snug outline-hidden ring-sidebar-ring focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        className
      )}
      {...props}
    />
  )
}

export default SidebarMenuSub
