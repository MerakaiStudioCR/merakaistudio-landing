'use client'

import { forwardRef, useCallback, useRef } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '~/shared/lib/cn'
import { handleGuardedLinkClick } from '~/shared/lib/form/guarded-navigation'

interface Props
  extends Omit<React.ComponentPropsWithoutRef<typeof NextLink>, 'onNavigate'> {
  href: string
  isActive: boolean
  onNavigated?: (href: string) => void
}

const SidebarNavLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      href,
      isActive,
      onNavigated,
      children,
      className,
      onClick,
      onMouseEnter,
      onFocus,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const pathname = usePathname()
    const hasPrefetchedRef = useRef(false)

    const prefetchRoute = useCallback(() => {
      if (hasPrefetchedRef.current || href === '#') return
      hasPrefetchedRef.current = true
      router.prefetch(href)
    }, [href, router])

    return (
      <NextLink
        ref={ref}
        href={href}
        prefetch
        scroll={false}
        data-active={isActive || undefined}
        className={cn(className)}
        onClick={(event) => {
          onClick?.(event)

          handleGuardedLinkClick({
            event,
            currentPathname: pathname,
            targetHref: href,
            router,
            onNavigateAllowed: () => onNavigated?.(href)
          })

          if (!event.defaultPrevented) {
            onNavigated?.(href)
          }
        }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          prefetchRoute()
        }}
        onFocus={(event) => {
          onFocus?.(event)
          prefetchRoute()
        }}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)

SidebarNavLink.displayName = 'SidebarNavLink'

export default SidebarNavLink
