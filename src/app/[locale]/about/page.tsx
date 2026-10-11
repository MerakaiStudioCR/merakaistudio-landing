import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutView from '~/components/sections/about-view'
import { resolveLocale } from '~/lib/locale'
import { pageMetadata } from '~/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requested } = await params
  const locale = await resolveLocale(requested)
  const t = await getTranslations({ locale, namespace: 'site.about' })

  return pageMetadata({
    locale,
    pathname: '/about',
    title: t('metaTitle'),
    description: t('metaDescription')
  })
}

const AboutPage = async ({
  params
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  await resolveLocale(locale)
  return <AboutView />
}

export default AboutPage
