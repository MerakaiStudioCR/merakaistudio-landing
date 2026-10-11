import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import type { MouseEvent } from 'react'
import {
  bypassFormUnsavedGuardOnce,
  confirmFormUnsavedLeave,
  shouldInterceptFormNavigation
} from '~/shared/lib/form/form-unsaved-guard'

export async function leaveWithUnsavedGuard(): Promise<boolean> {
  const canLeave = await confirmFormUnsavedLeave()
  if (canLeave) {
    bypassFormUnsavedGuardOnce()
  }
  return canLeave
}

export function isModifiedNavigationClick(
  event: MouseEvent<HTMLAnchorElement>
) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  )
}

export function shouldStartLinkNavigationProgress(
  event: MouseEvent<HTMLAnchorElement>,
  currentPathname: string,
  targetHref: string
) {
  if (event.defaultPrevented || isModifiedNavigationClick(event)) return false

  const urlPath = targetHref.split('?')[0] ?? targetHref
  return urlPath !== currentPathname
}

export function handleGuardedLinkClick({
  event,
  currentPathname,
  targetHref,
  router,
  onNavigateAllowed
}: {
  event: MouseEvent<HTMLAnchorElement>
  currentPathname: string
  targetHref: string
  router: AppRouterInstance
  onNavigateAllowed?: () => void
}) {
  if (event.defaultPrevented || isModifiedNavigationClick(event)) {
    return
  }

  if (!shouldInterceptFormNavigation(currentPathname, targetHref)) {
    return
  }

  event.preventDefault()

  void confirmFormUnsavedLeave().then((canLeave) => {
    if (!canLeave) return

    bypassFormUnsavedGuardOnce()
    onNavigateAllowed?.()
    router.push(targetHref)
  })
}

export async function navigateWithUnsavedGuard({
  currentPathname,
  targetHref,
  router
}: {
  currentPathname: string
  targetHref: string
  router: AppRouterInstance
}): Promise<boolean> {
  if (!shouldInterceptFormNavigation(currentPathname, targetHref)) {
    bypassFormUnsavedGuardOnce()
    router.push(targetHref)
    return true
  }

  const canLeave = await confirmFormUnsavedLeave()
  if (!canLeave) return false

  bypassFormUnsavedGuardOnce()
  router.push(targetHref)
  return true
}

/** @deprecated Next.js 16 does not support Link onNavigate — use handleGuardedLinkClick. */
export function runGuardedNavigation() {
  return () => undefined
}
