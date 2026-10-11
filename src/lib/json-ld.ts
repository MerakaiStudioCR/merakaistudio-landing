import { canPublishSoftwareApplication, type Product } from '~/content/products'

export function softwareApplicationJsonLd(
  product: Product,
  details: { name: string; description: string; url: string }
) {
  if (!canPublishSoftwareApplication(product.status)) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: details.name,
    description: details.description,
    url: details.url,
    ...(product.websiteUrl && product.websiteUrl !== details.url
      ? { sameAs: product.websiteUrl }
      : {})
  }
}
