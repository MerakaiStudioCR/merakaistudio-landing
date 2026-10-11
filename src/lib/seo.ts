import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getSiteUrl } from '~/content/site'
import { routing, type Locale } from '~/i18n/routing'

export function localizedPath(locale: Locale, pathname: string) {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (locale === routing.defaultLocale) return path === '' ? '/' : path
  if (path === '/') return `/${locale}`
  return `/${locale}${path}`
}

export function absoluteUrl(locale: Locale, pathname: string) {
  return `${getSiteUrl()}${localizedPath(locale, pathname)}`
}

export async function pageMetadata({
  locale,
  pathname,
  title,
  description
}: {
  locale: Locale
  pathname: string
  title: string
  description: string
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site.meta' })
  const canonical = absoluteUrl(locale, pathname)
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, absoluteUrl(item, pathname)])
  )

  return {
    title: pathname === '/' ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': absoluteUrl(routing.defaultLocale, pathname)
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: t('siteName'),
      locale: locale === 'es' ? 'es_CR' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}
