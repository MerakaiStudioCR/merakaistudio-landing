import { getTranslations } from 'next-intl/server'
import SectionHeading from '~/components/shared/section-heading'
import { ZaffiroLogo } from '~/components/brand/zaffiro-logo'
import { KizvnaStory } from '~/components/products/kizvna/kizvna-story'
import { ProductLanding } from '~/components/products/product-landing'
import { getProduct, products } from '~/content/products'
import { getSiteUrl } from '~/content/site'
import { Link } from '~/i18n/navigation'
import JsonLd from '~/components/seo/json-ld'
import { softwareApplicationJsonLd } from '~/lib/json-ld'
import { notFound } from 'next/navigation'
export async function CatalogView() {
  const t = await getTranslations('site')

  return (
    <section className='mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'>
      <SectionHeading
        eyebrow={t('catalog.eyebrow')}
        title={t('catalog.title')}
        subtitle={t('catalog.subtitle')}
      />
      <div className='merakai-fold mt-14 grid gap-6'>
        {products.map((product) => (
          <article
            key={product.slug}
            className='grid gap-6 border-merakai-navy/10 border-t py-10 lg:grid-cols-12'
          >
            <div className='lg:col-span-4'>
              <p className='font-body text-merakai-orange text-xs uppercase tracking-[0.18em]'>
                {t(`status.${product.status}`)}
              </p>
              <h2 className='mt-4 font-heading font-semibold text-4xl tracking-[-0.04em]'>
                {t(`items.${product.slug}.name`)}
              </h2>
            </div>
            <div className='lg:col-span-6'>
              <p className='text-merakai-navy/60 text-sm uppercase tracking-[0.14em]'>
                {t(`items.${product.slug}.category`)}
              </p>
              <p className='mt-4 text-merakai-navy/80 leading-relaxed'>
                {t(`items.${product.slug}.description`)}
              </p>
            </div>
            <div className='lg:col-span-2 lg:text-right'>
              {product.status ===
              'in-development' ? null : product.websiteUrl ? (
                <a
                  href={product.websiteUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='font-heading text-sm hover:text-merakai-orange'
                >
                  {t(`items.${product.slug}.cta`)}
                </a>
              ) : (
                <Link
                  href={`/products/${product.slug}`}
                  prefetch={false}
                  className='font-heading text-sm hover:text-merakai-orange'
                >
                  {t(`items.${product.slug}.cta`)}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export async function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)
  if (!product) notFound()
  const t = await getTranslations('site')
  const others = products.filter((item) => item.slug !== product.slug)
  const software = softwareApplicationJsonLd(product, {
    name: t(`items.${product.slug}.name`),
    description: t(`items.${product.slug}.description`),
    url: product.websiteUrl ?? `${getSiteUrl()}/products/${product.slug}`
  })

  return (
    <article className={`merakai-product merakai-product--${product.slug}`}>
      {software ? <JsonLd data={software} /> : null}
      {product.slug === 'kizvna' ? (
        <KizvnaStory />
      ) : product.pending ? (
        <section className='merakai-fold mx-auto w-full max-w-6xl px-5 py-16 sm:px-8'>
          <div className='border border-merakai-sand bg-merakai-gray p-8 sm:p-12'>
            <h2 className='font-heading font-semibold text-3xl tracking-[-0.03em]'>
              {t('product.pendingTitle')}
            </h2>
            <p className='mt-4 max-w-2xl text-merakai-navy/75 leading-relaxed'>
              {t('product.pendingBody')}
            </p>
          </div>
        </section>
      ) : (
        <ProductLanding slug={product.slug} />
      )}

      {product.slug === 'kizvna' ? null : (
        <section className='merakai-rise bg-merakai-navy text-merakai-paper'>
          <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between'>
            <div className='flex items-end gap-5'>
              {product.slug === 'zaffiro' ? (
                <ZaffiroLogo
                  variant='mark'
                  className='h-16 w-auto text-merakai-paper'
                />
              ) : null}
              <h2 className='max-w-xl font-heading font-semibold text-4xl tracking-[-0.03em]'>
                {product.pending
                  ? t('product.talk')
                  : t(`items.${product.slug}.invite`)}
              </h2>
            </div>
            {product.websiteUrl ? (
              <a
                href={product.websiteUrl}
                target='_blank'
                rel='noreferrer'
                className='merakai-action merakai-product-action inline-flex px-5 py-3 font-heading font-semibold'
              >
                {t(`items.${product.slug}.cta`)}
              </a>
            ) : (
              <Link
                href='/contact'
                prefetch={false}
                className='merakai-action merakai-product-action inline-flex px-5 py-3 font-heading font-semibold'
              >
                {t('nav.talk')}
              </Link>
            )}
          </div>
        </section>
      )}

      {product.slug === 'kizvna' ? null : (
        <section className='mx-auto w-full max-w-6xl px-5 py-16 sm:px-8'>
          <h2 className='font-heading font-semibold text-2xl'>
            {t('product.others')}
          </h2>
          <ul className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {others.map((item) => (
              <li key={item.slug}>
                {item.status === 'in-development' ? (
                  <div className='flex items-center justify-between border border-merakai-navy/10 px-5 py-6'>
                    <span className='font-heading text-2xl'>
                      {t(`items.${item.slug}.name`)}
                    </span>
                    <span className='text-merakai-orange text-sm'>
                      {t(`status.${item.status}`)}
                    </span>
                  </div>
                ) : item.websiteUrl ? (
                  <a
                    href={item.websiteUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center justify-between border border-merakai-navy/10 px-5 py-6 hover:border-merakai-orange'
                  >
                    <span className='font-heading text-2xl'>
                      {t(`items.${item.slug}.name`)}
                    </span>
                    <span className='text-merakai-orange text-sm'>
                      {t(`status.${item.status}`)}
                    </span>
                  </a>
                ) : (
                  <Link
                    href={`/products/${item.slug}`}
                    prefetch={false}
                    className='flex items-center justify-between border border-merakai-navy/10 px-5 py-6 hover:border-merakai-orange'
                  >
                    <span className='font-heading text-2xl'>
                      {t(`items.${item.slug}.name`)}
                    </span>
                    <span className='text-merakai-orange text-sm'>
                      {t(`status.${item.status}`)}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
