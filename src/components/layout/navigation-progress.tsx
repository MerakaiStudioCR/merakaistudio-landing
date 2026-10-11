'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '~/shared/lib/cn'
import { subscribeNavigationProgress } from '~/shared/lib/navigation-progress-store'

const NavigationProgress = () => {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => subscribeNavigationProgress(setIsActive), [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: hide progress bar when route changes
  useEffect(() => {
    setIsActive(false)
  }, [pathname])

  return (
    <div
      aria-hidden='true'
      className={cn(
        'navigation-progress',
        isActive && 'navigation-progress--active'
      )}
    />
  )
}

export default NavigationProgress
