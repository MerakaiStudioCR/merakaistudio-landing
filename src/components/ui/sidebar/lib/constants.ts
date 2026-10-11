export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'
export const SIDEBAR_MOBILE_BREAKPOINT = 1024

const SESSION_SELECTION_PATHS = [
  '/bootstrap',
  '/select-asada',
  '/select-tenant',
  '/setup'
] as const

export function isSessionSelectionPath(
  pathname: string | null | undefined
): boolean {
  if (!pathname) return false

  return SESSION_SELECTION_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )
}

export function shouldHideSidebar(pathname: string | null | undefined) {
  if (!pathname) return false

  return (
    isSessionSelectionPath(pathname) ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/admin')
  )
}
