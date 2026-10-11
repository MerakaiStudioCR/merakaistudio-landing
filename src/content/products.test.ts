import { describe, expect, it } from 'vitest'
import siteEn from '~/i18n/messages/site/en.json'
import siteEs from '~/i18n/messages/site/es.json'
import { softwareApplicationJsonLd } from '~/lib/json-ld'
import {
  canPublishSoftwareApplication,
  products,
  type Product
} from './products'

describe('products', () => {
  it('publishes Zaffiro at its official landing and keeps the rest unpublished', () => {
    const zaffiro = products.find((product) => product.slug === 'zaffiro')
    expect(zaffiro).toMatchObject({
      status: 'available',
      websiteUrl: 'https://zaffiro.app/'
    })
    expect(
      zaffiro &&
        softwareApplicationJsonLd(zaffiro, {
          name: 'Zaffiro',
          description: 'Water',
          url: 'https://zaffiro.app/'
        })
    ).toMatchObject({
      '@type': 'SoftwareApplication',
      url: 'https://zaffiro.app/'
    })

    for (const catalog of [siteEs, siteEn]) {
      const copy = catalog.items.zaffiro
      expect(copy.description).toMatch(/ASADA/)
      expect(copy.cta).toMatch(/zaffiro\.app/)
      expect(`${copy.description} ${copy.value}`).not.toMatch(
        /99\.8|San Rafael/
      )
    }

    for (const product of products) {
      if (product.slug === 'zaffiro') continue
      expect(canPublishSoftwareApplication(product.status)).toBe(false)
      expect(
        softwareApplicationJsonLd(product, {
          name: product.slug,
          description: '',
          url: `http://localhost:3000/products/${product.slug}`
        })
      ).toBeNull()
    }
  })

  it('keeps Kizvna as a concept without a published software claim', () => {
    const kizvna = products.find((product) => product.slug === 'kizvna')
    expect(kizvna).toMatchObject({
      status: 'concept',
      pending: false
    })
    expect(kizvna && canPublishSoftwareApplication(kizvna.status)).toBe(false)
    expect(
      kizvna &&
        softwareApplicationJsonLd(kizvna, {
          name: 'KIZVNA',
          description: '',
          url: 'http://localhost:3000/products/kizvna'
        })
    ).toBeNull()

    for (const catalog of [siteEs, siteEn]) {
      const copy = catalog.items.kizvna
      expect(copy.name).toBe('KIZVNA')
      expect(copy.category.toLowerCase()).toMatch(/audiovisual/)
      expect(copy.description.toLowerCase()).toMatch(/fotograf|photography/)
      expect(copy.description.toLowerCase()).toMatch(/moda|fashion/)
      expect(copy.description.toLowerCase()).not.toMatch(
        /lanzamiento|launch|función|funciones|feature|plataforma publicada|published platform/
      )
      expect(copy.identity.kofahTitle).toBe('KOFAH')
    }
  })

  it('emits SoftwareApplication only for beta or available products', () => {
    const published = {
      ...products[0],
      status: 'available'
    } as Product

    expect(
      softwareApplicationJsonLd(published, {
        name: 'Zaffiro',
        description: 'Water',
        url: 'http://localhost:3000/products/zaffiro'
      })
    ).toMatchObject({
      '@type': 'SoftwareApplication',
      name: 'Zaffiro'
    })
  })
})
