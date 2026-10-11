import { getTranslations } from 'next-intl/server'
import HeroField from '~/components/brand/hero-field'
import { StudioScene } from '~/components/brand/studio-scenes'
import { ZaffiroLogo } from '~/components/brand/zaffiro-logo'
import { KizvnaStill } from '~/components/products/kizvna/kizvna-still'
import SectionHeading from '~/components/shared/section-heading'
import { products } from '~/content/products'
import { Link } from '~/i18n/navigation'
import { cn } from '~/shared/lib/cn'

const HomeView = async () => {
  const t = await getTranslations('site')
  const ticker = [
    t('meta.slogan'),
    t('meta.declaration'),
    t('home.philosophy.pillar1Title'),
    t('home.philosophy.pillar2Title'),
    t('home.philosophy.pillar3Title')
  ]

  return (
    <>
      <section className='merakai-hero relative'>
        <div className='merakai-hero__pin overflow-hidden'>
          <div className='merakai-grid' aria-hidden />
          <div className='relative mx-auto grid w-full max-w-6xl items-end gap-16 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 lg:grid-cols-12 lg:pb-28'>
            <div className='merakai-hero-copy lg:col-span-7'>
              <p className='font-body text-merakai-orange text-xs uppercase tracking-[0.22em]'>
                {t('home.hero.eyebrow')}
              </p>
              <h1 className='mt-6 max-w-4xl text-balance font-heading font-semibold text-[clamp(2.8rem,6vw,5.4rem)] text-merakai-navy leading-[0.92] tracking-[-0.045em]'>
                {t('home.hero.title')}
              </h1>
              <p className='mt-8 max-w-xl text-lg text-merakai-navy/75 leading-relaxed'>
                {t('home.hero.subtitle')}
              </p>
              <div className='mt-10 flex flex-wrap gap-3'>
                <Link
                  href='/products'
                  prefetch={false}
                  className='merakai-action bg-merakai-orange px-5 py-3 font-heading font-semibold text-merakai-navy'
                >
                  {t('home.hero.primaryCta')}
                </Link>
                <Link
                  href='/about'
                  prefetch={false}
                  className='merakai-action border border-merakai-navy/20 px-5 py-3 font-heading font-semibold text-merakai-navy'
                >
                  {t('home.hero.secondaryCta')}
                </Link>
              </div>
            </div>
            <HeroField className='lg:col-span-5' />
          </div>
        </div>
      </section>
      <div className='merakai-ticker' aria-hidden>
        <div className='merakai-ticker__track'>
          {[0, 1].map((copy) => (
            <p key={copy} className='contents'>
              {ticker.map((item) => (
                <span key={`${copy}-${item}`} className='merakai-ticker__item'>
                  {item}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className='merakai-philosophy merakai-fold bg-merakai-gray'>
        <div className='merakai-philosophy__pin mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <SectionHeading
              eyebrow={t('home.philosophy.eyebrow')}
              title={t('home.philosophy.title')}
              subtitle={t('home.philosophy.body')}
            />
            <StudioScene scene='studio' className='merakai-in mt-10' />
          </div>
          <div className='merakai-pillars relative lg:col-span-6 lg:col-start-7'>
            <span className='merakai-rail' aria-hidden />
            <ol className='space-y-10'>
              {(['pillar1', 'pillar2', 'pillar3'] as const).map(
                (key, index) => (
                  <li
                    key={key}
                    className='merakai-pillar border-merakai-navy/10 border-t pt-6'
                  >
                    <p className='font-heading text-merakai-orange text-sm'>
                      0{index + 1}
                    </p>
                    <h3 className='mt-3 font-heading font-semibold text-2xl tracking-[-0.03em]'>
                      {t(`home.philosophy.${key}Title`)}
                    </h3>
                    <p className='mt-3 text-merakai-navy/75 leading-relaxed'>
                      {t(`home.philosophy.${key}Body`)}
                    </p>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      </section>

      <section className='mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28'>
        <SectionHeading
          eyebrow={t('home.products.eyebrow')}
          title={t('home.products.title')}
          subtitle={t('home.products.subtitle')}
        />
        <div className='merakai-products mt-14'>
          <ProductPanel
            slug='zaffiro'
            className='merakai-from-fold min-h-[28rem] bg-merakai-navy text-merakai-paper'
            tone='paper'
          />
          <div className='merakai-products__pair'>
            <span className='merakai-bridge' aria-hidden />
            <ProductPanel
              slug='kizvna'
              className='merakai-from-left min-h-80 bg-merakai-gray text-merakai-navy'
            />
            <ProductPanel
              slug='vytal'
              className='merakai-from-right min-h-96 bg-merakai-paper text-merakai-navy ring-1 ring-merakai-navy/10'
            />
          </div>
        </div>
      </section>

      <section className='border-merakai-navy/10 border-y'>
        <div className='mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28'>
          <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <SectionHeading
              eyebrow={t('home.capabilities.eyebrow')}
              title={t('home.capabilities.title')}
            />
            <StudioScene scene='design' className='merakai-in shrink-0' />
          </div>
          <ul className='merakai-lattice mt-14 grid gap-px bg-merakai-navy/10 sm:grid-cols-2 lg:grid-cols-3'>
            {([1, 2, 3, 4, 5, 6] as const).map((item) => (
              <li key={item} className='merakai-cell bg-merakai-paper p-7'>
                <p className='font-heading text-merakai-sand text-sm'>
                  0{item}
                </p>
                <h3 className='mt-4 font-heading font-semibold text-xl tracking-[-0.02em]'>
                  {t(`home.capabilities.item${item}Title`)}
                </h3>
                <p className='mt-3 text-merakai-navy/70 text-sm leading-relaxed'>
                  {t(`home.capabilities.item${item}Body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className='merakai-method'>
        <div className='merakai-method__pin mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28'>
          <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <SectionHeading
              eyebrow={t('home.process.eyebrow')}
              title={t('home.process.title')}
            />
            <StudioScene scene='code' className='merakai-in shrink-0' />
          </div>
          <ol className='merakai-steps mt-16 grid gap-10 md:grid-cols-4'>
            {([1, 2, 3, 4] as const).map((step) => (
              <li key={step} className='merakai-step relative'>
                <p className='merakai-step-index font-heading font-semibold text-5xl tracking-[-0.04em]'>
                  <span className='merakai-step-index__ghost'>0{step}</span>
                  <span className='merakai-step-index__fill' aria-hidden>
                    0{step}
                  </span>
                </p>
                <h3 className='mt-4 font-heading font-semibold text-2xl'>
                  {t(`home.process.step${step}Title`)}
                </h3>
                <p className='mt-3 text-merakai-navy/75 text-sm leading-relaxed'>
                  {t(`home.process.step${step}Body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='bg-merakai-gray'>
        <div className='mx-auto grid w-full max-w-6xl items-end gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12'>
          <div className='lg:col-span-6'>
            <SectionHeading
              eyebrow={t('home.about.eyebrow')}
              title={t('home.about.title')}
              subtitle={t('home.about.body')}
            />
            <Link
              href='/about'
              prefetch={false}
              className='merakai-action mt-8 inline-flex border border-merakai-navy px-5 py-3 font-heading font-semibold text-merakai-navy'
            >
              {t('home.about.cta')}
            </Link>
          </div>
          <div className='grid gap-6 sm:grid-cols-3 lg:col-span-6'>
            <StudioScene scene='studio' className='merakai-in max-w-none' />
            <StudioScene scene='design' className='merakai-in max-w-none' />
            <StudioScene scene='code' className='merakai-in max-w-none' />
          </div>
        </div>
      </section>

      <section className='merakai-cta merakai-rise bg-merakai-navy text-merakai-paper'>
        <StudioScene
          scene='code'
          tone='paper'
          className='merakai-in pointer-events-none absolute right-8 bottom-8 hidden w-72 lg:block'
        />
        <div className='relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:pr-80'>
          <h2 className='max-w-4xl text-balance font-heading font-semibold text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.04em]'>
            {t('home.cta.title')}
          </h2>
          <p className='mt-6 max-w-xl text-lg text-merakai-paper/75'>
            {t('home.cta.subtitle')}
          </p>
          <Link
            href='/contact'
            prefetch={false}
            className='merakai-action relative mt-10 inline-flex bg-merakai-orange px-5 py-3 font-heading font-semibold text-merakai-navy'
          >
            {t('home.cta.cta')}
          </Link>
        </div>
      </section>
    </>
  )
}

const ProductPanel = async ({
  slug,
  className,
  tone = 'navy'
}: {
  slug: (typeof products)[number]['slug']
  className?: string
  tone?: 'navy' | 'paper'
}) => {
  const t = await getTranslations('site')
  const product = products.find((item) => item.slug === slug)
  if (!product) return null

  return (
    <Link
      href={`/products/${slug}`}
      prefetch={false}
      className={cn(
        'merakai-panel group flex flex-col justify-between p-8 sm:p-10',
        className
      )}
    >
      <div>
        <p
          className={cn(
            'font-body text-xs uppercase tracking-[0.18em]',
            tone === 'paper' ? 'text-merakai-yellow' : 'text-merakai-orange'
          )}
        >
          {t(`status.${product.status}`)}
        </p>
        <div className='mt-6 flex items-end justify-between gap-4'>
          <h3 className='font-heading font-semibold text-4xl tracking-[-0.04em] sm:text-5xl'>
            {slug === 'zaffiro' ? (
              <ZaffiroLogo
                variant='lockup'
                title={t('items.zaffiro.name')}
                className='h-16 w-auto max-w-full text-merakai-paper sm:h-20'
              />
            ) : (
              t(`items.${slug}.name`)
            )}
          </h3>
          {slug === 'kizvna' ? (
            <KizvnaStill still='music' size='preview' />
          ) : null}
        </div>
        <p
          className={cn(
            'mt-4 max-w-xl text-sm uppercase tracking-[0.14em]',
            tone === 'paper' ? 'text-merakai-paper/70' : 'text-merakai-navy/60'
          )}
        >
          {t(`items.${slug}.category`)}
        </p>
      </div>
      <div className='mt-10 flex items-end justify-between gap-6'>
        <p
          className={cn(
            'max-w-xl leading-relaxed',
            tone === 'paper' ? 'text-merakai-paper/85' : 'text-merakai-navy/75'
          )}
        >
          {t(`items.${slug}.description`)}
        </p>
        <span className='shrink-0 font-heading text-sm group-hover:text-merakai-orange'>
          {t(`items.${slug}.cta`)}
        </span>
      </div>
    </Link>
  )
}

export default HomeView
