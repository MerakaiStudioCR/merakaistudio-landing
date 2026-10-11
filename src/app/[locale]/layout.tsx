import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import DocumentLang from '~/components/layout/document-lang'
import SiteShell from '~/components/layout/site-shell'
import JsonLd from '~/components/seo/json-ld'
import {
  getPublicContactEmail,
  getSiteUrl,
  getSocialLinks
} from '~/content/site'
import { routing, isLocale } from '~/i18n/routing'
import { resolveLocale } from '~/lib/locale'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const LocaleLayout = async ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) => {
  const { locale: requested } = await params
  if (!isLocale(requested)) notFound()
  const locale = await resolveLocale(requested)
  const catalog = await getMessages()
  const messages = { site: catalog.site }
  const t = await getTranslations({ locale, namespace: 'site.meta' })
  const email = getPublicContactEmail()
  const sameAs = getSocialLinks().map((item) => item.href)
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t('siteName'),
    url: getSiteUrl(),
    slogan: t('slogan'),
    description: t('declaration'),
    logo: `${getSiteUrl()}/brand/mark.svg`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CR'
    },
    ...(email ? { email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {})
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DocumentLang locale={locale} />
      <JsonLd data={organization} />
      <SiteShell>{children}</SiteShell>
    </NextIntlClientProvider>
  )
}

export default LocaleLayout
