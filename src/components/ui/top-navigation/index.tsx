'use client'

import Logo from './components/logo'

interface TopNavigationProps {
  leftSideContent?: React.ReactNode
  brandContext?: React.ReactNode
  rightSideContent?: React.ReactNode
}

const TopNavigation = ({
  leftSideContent,
  brandContext,
  rightSideContent
}: TopNavigationProps) => (
  <div data-slot='top-navigation' className='h-(--top-nav-height) w-full'>
    <div className='shell-top-nav fixed inset-x-0 top-0 z-50 flex h-(--top-nav-height) items-center border-border border-b bg-top-nav-background shadow-sm'>
      <div className='flex w-full max-w-dvw items-center justify-between gap-3 px-4 lg:px-8'>
        <div className='flex min-w-0 items-center gap-3'>
          {leftSideContent}
          <Logo />
          {brandContext}
        </div>
        {rightSideContent}
      </div>
    </div>
  </div>
)

export default TopNavigation
