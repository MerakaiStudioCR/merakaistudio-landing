export const productStatuses = [
  'concept',
  'in-development',
  'beta',
  'available'
] as const

export type ProductStatus = (typeof productStatuses)[number]

export const productSlugs = ['zaffiro', 'kizvna', 'vytal'] as const

export type ProductSlug = (typeof productSlugs)[number]

export interface Product {
  slug: ProductSlug
  status: ProductStatus
  accent: 'navy' | 'sand' | 'mint'
  pending: boolean
  logo?: string
  websiteUrl?: string
}

export const products: readonly Product[] = [
  {
    slug: 'zaffiro',
    status: 'available',
    accent: 'navy',
    pending: false,
    websiteUrl: 'https://zaffiro.app/',
    logo: '/brand/zaffiro/logo.svg'
  },
  {
    slug: 'kizvna',
    status: 'concept',
    accent: 'sand',
    pending: false
  },
  {
    slug: 'vytal',
    status: 'in-development',
    accent: 'mint',
    pending: false
  }
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function isProductSlug(slug: string): slug is ProductSlug {
  return productSlugs.some((item) => item === slug)
}

export function canPublishSoftwareApplication(status: ProductStatus) {
  return status === 'beta' || status === 'available'
}
