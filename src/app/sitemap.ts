import type { MetadataRoute } from 'next'
import { products } from '~/content/products'
import { routing } from '~/i18n/routing'
import { absoluteUrl } from '~/lib/seo'

const paths = [
  '/',
  '/products',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  ...products.map((product) => `/products/${product.slug}`)
]

function languages(pathname: string) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, absoluteUrl(locale, pathname)])
    ),
    'x-default': absoluteUrl(routing.defaultLocale, pathname)
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((pathname) => ({
      url: absoluteUrl(locale, pathname),
      alternates: { languages: languages(pathname) }
    }))
  )
}
