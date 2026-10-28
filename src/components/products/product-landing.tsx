import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { StudioIcon } from '~/components/brand/studio-icons'
import { ZaffiroLogo } from '~/components/brand/zaffiro-logo'
import { getProduct, type ProductSlug } from '~/content/products'
import { Link } from '~/i18n/navigation'
import { cn } from '~/shared/lib/cn'

const focusKeys = ['focus1', 'focus2', 'focus3'] as const
const benefitKeys = ['benefit1', 'benefit2', 'benefit3'] as const

export async function ProductLanding({ slug }: { slug: ProductSlug }) {
  const t = await getTranslations('site')
  const product = getProduct(slug)
  if (!product) return null
  const dark = slug === 'zaffiro'
  const showsDirection =
    product.status === 'concept' || product.status === 'in-development'

  return (
    <>
      <header
        className={cn(
          'product-landing__open relative overflow-hidden',
          dark ? 'bg-merakai-navy text-merakai-paper' : 'text-merakai-navy'
        )}
      >
        <div className='merakai-grid' aria-hidden />
        <div className='relative mx-auto grid w-full max-w-6xl items-end gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12'>
          <div className='merakai-hero-copy lg:col-span-7'>
            <p
              className={cn(
                'font-body text-xs uppercase tracking-[0.2em]',
                dark ? 'text-merakai-paper/70' : 'text-merakai-orange'
              )}
            >
              {t(`status.${product.status}`)}
            </p>
            <p className='mt-6'>
              {slug === 'zaffiro' ? (
                <ZaffiroLogo
                  variant='lockup'
                  title={t('items.zaffiro.name')}
                  className='h-12 w-auto text-white sm:h-14'
                />
              ) : (
                <span className='font-heading font-semibold text-3xl tracking-[-0.04em] sm:text-4xl'>
                  {t(`items.${slug}.name`)}
                </span>
              )}
            </p>
            <h1 className='product-landing__hook mt-6'>
              {t(`items.${slug}.hook`)}
            </h1>
            <p
              className={cn(
                'mt-6 max-w-xl text-lg leading-relaxed',
                dark ? 'text-merakai-paper/80' : 'text-merakai-navy/75'
              )}
            >
              {t(`items.${slug}.tagline`)}
            </p>
            <LandingAction slug={slug} className='mt-8' />
          </div>
          {slug === 'zaffiro' ? (
            <div className='product-landing__still lg:col-span-5'>
              <Image
                src='/brand/zaffiro/river.jpg'
                alt={t('items.zaffiro.riverAlt')}
                fill
                sizes='(min-width: 1024px) 28rem, 100vw'
                className='object-cover'
              />
            </div>
          ) : null}
          {slug === 'dyniq' ? (
            <div className='product-landing__mark lg:col-span-5' aria-hidden>
              <StudioIcon name='agent' />
            </div>
          ) : null}
        </div>
      </header>

      <section className='product-landing__tension merakai-fold bg-merakai-gray'>
        <div className='mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28'>
          <p className='product-landing__tension-line font-heading font-semibold'>
            {t(`items.${slug}.problem`)}
          </p>
        </div>
      </section>

      <section className='mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28'>
        <p className='font-body text-merakai-orange text-xs uppercase tracking-[0.22em]'>
          {t('product.turn')}
        </p>
        <p className='product-landing__answer mt-6 font-heading font-semibold'>
          {t(`items.${slug}.value`)}
        </p>
        <div className='mt-16'>
          <h2 className='font-heading font-semibold text-2xl tracking-[-0.03em]'>
            {showsDirection ? t('product.focus') : t('product.modules')}
          </h2>
          {showsDirection ? (
            <p className='mt-3 max-w-xl text-merakai-navy/60 text-sm leading-relaxed'>
              {t('product.focusNote')}
            </p>
          ) : null}
          <ol className='product-landing__chapters mt-8'>
            {focusKeys.map((key, index) => (
              <li key={key} className='product-landing__chapter merakai-in'>
                <span>0{index + 1}</span>
                <p>{t(`items.${slug}.${key}`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='border-merakai-navy/10 border-y bg-merakai-gray'>
        <div className='mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <h2 className='font-heading font-semibold text-3xl tracking-[-0.03em]'>
              {showsDirection
                ? t('product.benefits')
                : t('product.benefitsLive')}
            </h2>
            <ul className='mt-8 space-y-5'>
              {benefitKeys.map((key) => (
                <li
                  key={key}
                  className='border-merakai-orange border-l-2 pl-4 text-lg leading-snug'
                >
                  {t(`items.${slug}.${key}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className='lg:col-span-6 lg:col-start-7 lg:pt-16'>
            <p className='font-body text-merakai-orange text-xs uppercase tracking-[0.22em]'>
              {t('product.audience')}
            </p>
            <p className='mt-4 font-heading font-semibold text-3xl leading-tight tracking-[-0.03em]'>
              {t(`items.${slug}.audience`)}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

async function LandingAction({
  slug,
  className
}: {
  slug: ProductSlug
  className?: string
}) {
  const t = await getTranslations('site')
  const product = getProduct(slug)
  const classNames = cn(
    'merakai-action merakai-product-action inline-flex px-5 py-3 font-heading font-semibold',
    className
  )

  if (product?.websiteUrl) {
    return (
      <a
        href={product.websiteUrl}
        target='_blank'
        rel='noreferrer'
        className={classNames}
      >
        {t(`items.${slug}.cta`)}
      </a>
    )
  }

  return (
    <Link href='/contact' prefetch={false} className={classNames}>
      {t('nav.talk')}
    </Link>
  )
}
