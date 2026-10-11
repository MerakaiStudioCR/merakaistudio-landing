'use client'

import NavigationProgress from '~/components/layout/navigation-progress'
import PrefetchInitializer from '~/shared/components/prefetch-initializer'

const TOP_NAV_HEIGHT = '56px'

interface AppShellProps {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div
      className='flex min-h-screen flex-col'
      style={{ '--top-nav-height': TOP_NAV_HEIGHT } as React.CSSProperties}
    >
      <header className='flex h-14 items-center border-b px-4'>
        <span className='font-heading font-semibold text-brand text-lg'>
          Merakai
        </span>
      </header>
      <NavigationProgress />
      <PrefetchInitializer />
      <main className='flex min-h-0 flex-1 flex-col'>{children}</main>
    </div>
  )
}

export default AppShell
