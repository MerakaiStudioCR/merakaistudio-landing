import { getTranslations } from 'next-intl/server'
import { Link } from '~/i18n/navigation'

const LocaleNotFound = async () => {
  const t = await getTranslations('site.notFound')

  return (
    <section className='mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-5 py-24 sm:px-8'>
      <p className='font-heading text-merakai-orange text-sm'>404</p>
      <h1 className='mt-4 font-heading font-semibold text-5xl tracking-[-0.04em]'>
        {t('title')}
      </h1>
      <p className='mt-4 text-merakai-navy/75'>{t('body')}</p>
      <Link
        href='/'
        className='mt-8 inline-flex w-fit bg-merakai-orange px-5 py-3 font-heading font-semibold text-merakai-navy'
      >
        {t('cta')}
      </Link>
    </section>
  )
}

export default LocaleNotFound
