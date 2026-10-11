import { Slot } from '@radix-ui/react-slot'
import { cn } from '~/shared/lib/cn'
import Tooltip from '~/components/ui/tooltip'
import useSidebar from '../hooks/useSidebar'

const SidebarMenu = ({ className, ...props }: React.ComponentProps<'ul'>) => {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  )
}

export const SidebarMenuItem = ({
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn(
        'group/menu-item relative flex w-full min-w-0 [&_a]:text-inherit [&_a]:hover:no-underline',
        className
      )}
      {...props}
    />
  )
}

export const SidebarMenuButton = ({
  isActive = false,
  asChild = false,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof Tooltip.Content>
}) => {
  const { isMobile, state } = useSidebar()
  const Component = asChild ? Slot : 'a'

  const button = (
    <Component
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-active={isActive}
      className={cn(
        'peer/menu-button flex items-center gap-2 rounded-md p-2 text-left outline-hidden ring-sidebar-ring focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:justify-center group-data-[state=collapsed]:gap-0.5 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:data-[active=true]:shadow-none group-data-[collapsible=icon]:data-[active=true]:ring-1 group-data-[collapsible=icon]:data-[active=true]:ring-[var(--accent-cta)]/45 group-data-[collapsible=icon]:[&_span]:sr-only [&_svg]:size-4',
        className
      )}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip
    }
  }

  return (
    <Tooltip>
      <Tooltip.Trigger className='w-full'>{button}</Tooltip.Trigger>
      <Tooltip.Content
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

export default SidebarMenu
