import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CatalogView } from '~/components/products/product-views'
import { resolveLocale } from '~/lib/locale'
import { pageMetadata } from '~/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requested } = await params
  const locale = await resolveLocale(requested)
  const t = await getTranslations({ locale, namespace: 'site.catalog' })

  return pageMetadata({
    locale,
    pathname: '/products',
    title: t('metaTitle'),
    description: t('metaDescription')
  })
}

const ProductsPage = async ({
  params
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  await resolveLocale(locale)
  return <CatalogView />
}

export default ProductsPage
