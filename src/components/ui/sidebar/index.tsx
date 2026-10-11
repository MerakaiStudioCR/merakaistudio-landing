import { cn } from '~/shared/lib/cn'
import Sheet from '~/components/ui/sheet'
// Child components
import SidebarContent from './components/content'
import SidebarInset from './components/inset'
import SidebarFooter from './components/footer'
// Group
import SidebarGroup, {
  SidebarGroupContent,
  SidebarGroupLabel
} from './components/group'
import SidebarHeader from './components/header'
// Menus
import SidebarMenu, {
  SidebarMenuButton,
  SidebarMenuItem
} from './components/menu'
import SidebarMenuSub, {
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from './components/sub-menu'
// Hooks
import useMessages from '~/i18n/useMessages'
import useSidebar from './hooks/useSidebar'
// Constants
import { SIDEBAR_WIDTH_MOBILE } from './lib/constants'

const Sidebar = ({
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) => {
  const t = useMessages('main-navigation')
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  const showDrawer = isMobile || openMobile

  if (collapsible === 'none') {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          'flex h-full w-(--sidebar-width) flex-col text-sidebar-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (showDrawer) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <Sheet.Content
          data-sidebar='sidebar'
          data-slot='sidebar-mobile'
          data-mobile='true'
          className='w-(--sidebar-width) bg-transparent p-0 text-sidebar-foreground sm:max-w-(--sidebar-width)'
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
        >
          <Sheet.Header className='sr-only'>
            <Sheet.Title>{t('sr-title')}</Sheet.Title>
            <Sheet.Description>{t('sr-description')}</Sheet.Description>
          </Sheet.Header>
          <div
            className='brand-sidebar-shell relative flex h-full w-full flex-col py-6'
            data-slot='sidebar-mobile-inner'
          >
            {children}
          </div>
        </Sheet.Content>
      </Sheet>
    )
  }

  return (
    <div
      className='group peer hidden text-sidebar-foreground lg:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-slot='sidebar'
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot='sidebar-gap'
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-150 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot='sidebar-container'
        className={cn(
          'fixed inset-y-0 z-10 hidden h-full w-(--sidebar-width) pt-(--top-nav-height) transition-[left,right,width] duration-150 ease-linear lg:flex',
          'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className='brand-sidebar-shell relative flex h-full w-full flex-col overflow-hidden py-6'
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// Create compound components
Sidebar.Content = SidebarContent
Sidebar.Footer = SidebarFooter
Sidebar.Group = SidebarGroup
Sidebar.GroupContent = SidebarGroupContent
Sidebar.GroupLabel = SidebarGroupLabel
Sidebar.Header = SidebarHeader
Sidebar.Menu = SidebarMenu
Sidebar.MenuButton = SidebarMenuButton
Sidebar.MenuItem = SidebarMenuItem
Sidebar.MenuSub = SidebarMenuSub
Sidebar.MenuSubItem = SidebarMenuSubItem
Sidebar.MenuSubButton = SidebarMenuSubButton
Sidebar.Inset = SidebarInset

export default Sidebar
export { SidebarInset }
