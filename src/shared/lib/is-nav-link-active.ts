export function normalizeNavPath(url: string) {
  return url.split('?')[0] ?? url
}

interface IsNavLinkActiveOptions {
  url: string
  pathname: string
  pendingPath?: string | null
  searchParams?: string
  navUrls: string[]
}

export function isNavLinkActive({
  url,
  pathname,
  pendingPath = null,
  searchParams = '',
  navUrls
}: IsNavLinkActiveOptions) {
  if (!url || url === '#') return false

  const urlPath = normalizeNavPath(url)

  if (pendingPath) return pendingPath === urlPath

  if (url === '/dashboard') return pathname === '/dashboard'

  if (url.includes('?')) {
    const [path, query] = url.split('?')
    if (pathname !== path && !pathname.startsWith(`${path}/`)) {
      return false
    }

    const linkParams = new URLSearchParams(query)
    const currentParams = new URLSearchParams(searchParams)

    for (const [key, value] of linkParams.entries()) {
      if (currentParams.get(key) !== value) return false
    }

    return true
  }

  const pathMatches = pathname === urlPath || pathname.startsWith(`${urlPath}/`)
  if (!pathMatches) return false

  const hasMoreSpecificMatch = navUrls.some((otherUrl) => {
    if (otherUrl === url) return false

    const otherPath = normalizeNavPath(otherUrl)
    if (!otherPath.startsWith(`${urlPath}/`)) return false

    return pathname === otherPath || pathname.startsWith(`${otherPath}/`)
  })

  return !hasMoreSpecificMatch
}
