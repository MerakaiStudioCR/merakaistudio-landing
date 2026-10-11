export interface SocialLink {
  label: string
  href: string
}

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!value) return 'http://localhost:3000'
  return value.replace(/\/$/, '')
}

export function getPublicContactEmail() {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
  return value || undefined
}

export function getSocialLinks(): SocialLink[] {
  const entries = [
    ['LinkedIn', process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN],
    ['Instagram', process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM],
    ['X', process.env.NEXT_PUBLIC_SOCIAL_X]
  ] as const

  return entries.flatMap(([label, href]) => {
    const value = href?.trim()
    if (!value) return []
    return [{ label, href: value }]
  })
}
