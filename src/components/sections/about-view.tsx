import { getTranslations } from 'next-intl/server'
import { products } from '~/content/products'
import { Link } from '~/i18n/navigation'

const values = ['value1', 'value2', 'value3', 'value4', 'value5'] as const

const AboutView = async () => {
  const t = await getTranslations('site')

  return (
    <article className='mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24'>
      <div className='merakai-hero-copy'>
        <p className='font-body text-merakai-orange text-xs uppercase tracking-[0.22em]'>
          {t('about.eyebrow')}
        </p>
        <h1 className='mt-5 max-w-4xl text-balance font-heading font-semibold text-5xl tracking-[-0.04em] sm:text-7xl'>
          {t('about.title')}
        </h1>
        <p className='mt-8 max-w-2xl text-merakai-navy/60 text-sm uppercase tracking-[0.16em]'>
          {t('about.sloganLabel')}: {t('meta.slogan')}
        </p>
      </div>

      <div className='merakai-fold mt-16 grid gap-16 lg:grid-cols-2'>
        <section>
          <h2 className='font-heading font-semibold text-3xl'>
            {t('about.originTitle')}
          </h2>
          <p className='mt-4 text-merakai-navy/75 leading-relaxed'>
            {t('about.originBody')}
          </p>
          <p className='mt-6 border-merakai-orange border-l-2 pl-5 text-xl leading-relaxed'>
            {t('about.purpose')}
          </p>
        </section>
        <section>
          <h2 className='font-heading font-semibold text-3xl'>
            {t('about.philosophyTitle')}
          </h2>
          <p className='mt-4 text-merakai-navy/75 leading-relaxed'>
            {t('about.philosophyBody')}
          </p>
        </section>
        <section>
          <h2 className='font-heading font-semibold text-3xl'>
            {t('about.missionTitle')}
          </h2>
          <p className='mt-4 text-merakai-navy/75 leading-relaxed'>
            {t('about.missionBody')}
          </p>
        </section>
        <section>
          <h2 className='font-heading font-semibold text-3xl'>
            {t('about.visionTitle')}
          </h2>
          <p className='mt-4 text-merakai-navy/75 leading-relaxed'>
            {t('about.visionBody')}
          </p>
        </section>
      </div>

      <section className='mt-20'>
        <h2 className='font-heading font-semibold text-3xl'>
          {t('about.valuesTitle')}
        </h2>
        <ul className='mt-8 grid gap-4 sm:grid-cols-5'>
          {values.map((key) => (
            <li
              key={key}
              className='border border-merakai-navy/10 px-4 py-6 font-heading text-lg'
            >
              {t(`about.${key}`)}
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-20 grid gap-10 lg:grid-cols-2'>
        <div>
          <h2 className='font-heading font-semibold text-3xl'>
            {t('about.capabilitiesTitle')}
          </h2>
          <p className='mt-4 text-merakai-navy/75 leading-relaxed'>
            {t('about.capabilitiesBody')}
          </p>
        </div>
        <div>
          <h2 className='font-heading font-semibold text-3xl'>
            {t('about.ecosystemTitle')}
          </h2>
          <p className='mt-4 text-merakai-navy/75 leading-relaxed'>
            {t('about.ecosystemBody')}
          </p>
          <ul className='mt-6 space-y-2'>
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className='hover:text-merakai-orange'
                >
                  {t(`items.${product.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}

export default AboutView
