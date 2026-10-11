import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { resolveLocale } from '~/lib/locale'
import { pageMetadata } from '~/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requested } = await params
  const locale = await resolveLocale(requested)
  const t = await getTranslations({ locale, namespace: 'site.legal.privacy' })

  return pageMetadata({
    locale,
    pathname: '/privacy',
    title: t('metaTitle'),
    description: t('metaDescription')
  })
}

const PrivacyPage = async ({
  params
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  await resolveLocale(locale)
  const t = await getTranslations('site.legal')
  const privacy = await getTranslations('site.legal.privacy')

  return (
    <article className='mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24'>
      <p className='border border-merakai-sand bg-merakai-gray px-4 py-3 text-sm leading-relaxed'>
        {t('draft')}
      </p>
      <h1 className='mt-10 font-heading font-semibold text-5xl tracking-[-0.04em]'>
        {privacy('title')}
      </h1>
      <p className='mt-4 text-merakai-navy/60 text-sm'>{privacy('updated')}</p>
      <div className='merakai-fold mt-10 space-y-6 text-merakai-navy/80 leading-relaxed'>
        <p>{privacy('p1')}</p>
        <p>{privacy('p2')}</p>
        <p>{privacy('p3')}</p>
      </div>
    </article>
  )
}

export default PrivacyPage
