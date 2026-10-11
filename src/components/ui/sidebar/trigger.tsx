'use client'

import { MenuIcon, PanelLeftIcon } from 'lucide-react'
import { cn } from '~/shared/lib/cn'
import Button, { type ButtonProps } from '~/components/ui/button'
import useSidebar from './hooks/useSidebar'
import useMessages from '~/i18n/useMessages'

interface SidebarTriggerProps extends ButtonProps {
  appearance?: 'sidebar' | 'header'
}

const SidebarTrigger = ({
  className,
  onClick,
  appearance = 'sidebar',
  ...props
}: SidebarTriggerProps) => {
  const { toggleSidebar, openMobile, setOpenMobile, isMobile } = useSidebar()
  const t = useMessages('main-navigation')
  const isHeader = appearance === 'header'

  return (
    <Button
      type='button'
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant={isHeader ? 'secondary' : 'outline'}
      aria-expanded={isHeader ? openMobile : undefined}
      className={cn(
        isHeader
          ? 'size-9 shrink-0 p-0 text-primary shadow-sm has-[>svg]:px-0 lg:hidden'
          : 'size-7 rounded-lg border-white/15 bg-white/10 hover:bg-white/15',
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (isHeader || isMobile) {
          setOpenMobile(!openMobile)
          return
        }
        toggleSidebar()
      }}
      {...props}
    >
      {isHeader ? (
        <MenuIcon className='size-5 text-primary' aria-hidden />
      ) : (
        <PanelLeftIcon className='text-white' aria-hidden />
      )}
      <span className='sr-only'>{t('open-menu')}</span>
    </Button>
  )
}

export default SidebarTrigger
