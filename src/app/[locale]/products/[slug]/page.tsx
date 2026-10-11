import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ProductView } from '~/components/products/product-views'
import { getProduct, products } from '~/content/products'
import { routing } from '~/i18n/routing'
import { resolveLocale } from '~/lib/locale'
import { pageMetadata } from '~/lib/seo'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug }))
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: requested, slug } = await params
  const locale = await resolveLocale(requested)
  const product = getProduct(slug)
  if (!product) return {}
  const t = await getTranslations({ locale, namespace: 'site' })

  return pageMetadata({
    locale,
    pathname: `/products/${product.slug}`,
    title: t(`items.${product.slug}.name`),
    description: t(`items.${product.slug}.tagline`)
  })
}

const ProductPage = async ({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await params
  await resolveLocale(locale)
  if (!getProduct(slug)) notFound()
  return <ProductView slug={slug} />
}

export default ProductPage
