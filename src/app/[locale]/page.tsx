import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomeView from '~/components/sections/home-view'
import { routing } from '~/i18n/routing'
import { resolveLocale } from '~/lib/locale'
import { pageMetadata } from '~/lib/seo'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requested } = await params
  const locale = await resolveLocale(requested)
  const t = await getTranslations({ locale, namespace: 'site.home' })

  return pageMetadata({
    locale,
    pathname: '/',
    title: t('metaTitle'),
    description: t('metaDescription')
  })
}

const HomePage = async ({
  params
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  await resolveLocale(locale)
  return <HomeView />
}

export default HomePage
