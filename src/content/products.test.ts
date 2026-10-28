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
  it('publishes Zaffiro and Dyniq at their official landings and keeps the rest unpublished', () => {
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
      expect(copy.hook.length).toBeGreaterThan(12)
      expect(copy.invite.length).toBeGreaterThan(12)
      expect(`${copy.description} ${copy.value}`).not.toMatch(
        /99\.8|San Rafael/
      )
    }

    const dyniq = products.find((product) => product.slug === 'dyniq')
    expect(dyniq).toMatchObject({
      status: 'available',
      websiteUrl: 'https://dyniq-ai.com'
    })
    expect(
      dyniq &&
        softwareApplicationJsonLd(dyniq, {
          name: 'Dyniq',
          description: 'Agents',
          url: 'https://dyniq-ai.com'
        })
    ).toMatchObject({
      '@type': 'SoftwareApplication',
      url: 'https://dyniq-ai.com'
    })

    for (const catalog of [siteEs, siteEn]) {
      const copy = catalog.items.dyniq
      expect(copy.description.toLowerCase()).toMatch(/voz|voice/)
      expect(copy.description.toLowerCase()).toMatch(/chat/)
      expect(copy.cta).toMatch(/dyniq-ai\.com/)
      expect(copy.hook).toMatch(/\?/)
      expect(copy.invite.length).toBeGreaterThan(12)
      expect(`${copy.description} ${copy.value}`).not.toMatch(/99\.|%/)
    }

    for (const product of products) {
      if (product.slug === 'zaffiro' || product.slug === 'dyniq') continue
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

  it('keeps Vytal in development and curious without a launch claim', () => {
    const vytal = products.find((product) => product.slug === 'vytal')
    expect(vytal).toMatchObject({ status: 'in-development' })
    expect(vytal && canPublishSoftwareApplication(vytal.status)).toBe(false)

    for (const catalog of [siteEs, siteEn]) {
      const copy = catalog.items.vytal
      expect(copy.hook.length).toBeGreaterThan(12)
      expect(copy.invite.toLowerCase()).toMatch(/cuéntanos|tell us/)
      expect(
        `${copy.hook} ${copy.invite} ${copy.value}`.toLowerCase()
      ).not.toMatch(/disponible|available now|lanzamiento|launch/)
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
