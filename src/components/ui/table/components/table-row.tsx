'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '~/shared/lib/cn'
import { navigateWithUnsavedGuard } from '~/shared/lib/form/guarded-navigation'
import { startNavigationProgress } from '~/shared/lib/navigation-progress-store'
import { isInteractiveTableRowTarget } from '../lib/is-interactive-table-row-target'

type Props = React.HTMLAttributes<HTMLTableRowElement> & {
  children: React.ReactNode
  href?: string
}

const shouldOpenInNewTab = (event: {
  metaKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  button?: number
}) => event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1

const TableRow = ({
  children,
  className,
  href,
  onClick,
  onAuxClick,
  onKeyDown,
  ...props
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToHref = (openInNewTab: boolean) => {
    if (!href) return

    if (openInNewTab) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    const urlPath = href.split('?')[0] ?? href
    if (urlPath !== pathname) startNavigationProgress()

    void navigateWithUnsavedGuard({
      currentPathname: pathname,
      targetHref: href,
      router
    })
  }

  return (
    <tr
      {...props}
      className={cn(
        'transition-colors hover:bg-muted/80 [&:last-child_td]:border-b-0',
        href &&
          'cursor-pointer focus-visible:bg-muted/80 focus-visible:outline-none',
        className
      )}
      role={href ? 'link' : props.role}
      tabIndex={href ? 0 : props.tabIndex}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || !href) return
        if (isInteractiveTableRowTarget(event.target)) return
        if (event.button !== 0) return

        navigateToHref(shouldOpenInNewTab(event))
      }}
      onAuxClick={(event) => {
        onAuxClick?.(event)
        if (event.defaultPrevented || !href) return
        if (isInteractiveTableRowTarget(event.target)) return
        if (event.button !== 1) return

        event.preventDefault()
        navigateToHref(true)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || !href) return
        if (event.currentTarget !== event.target) return
        if (event.key !== 'Enter' && event.key !== ' ') return

        event.preventDefault()
        navigateToHref(event.metaKey || event.ctrlKey)
      }}
    >
      {children}
    </tr>
  )
}

export default TableRow
