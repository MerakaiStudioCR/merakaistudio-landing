import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicContactEmail } from '~/content/site'
import ContactForm from '~/features/contact/contact-form'
import { resolveLocale } from '~/lib/locale'
import { pageMetadata } from '~/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: requested } = await params
  const locale = await resolveLocale(requested)
  const t = await getTranslations({ locale, namespace: 'site.contact' })

  return pageMetadata({
    locale,
    pathname: '/contact',
    title: t('metaTitle'),
    description: t('metaDescription')
  })
}

const ContactPage = async ({
  params
}: {
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  await resolveLocale(locale)
  const t = await getTranslations('site.contact')

  return (
    <section className='mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12'>
      <div className='merakai-hero-copy lg:col-span-5'>
        <p className='font-body text-merakai-orange text-xs uppercase tracking-[0.22em]'>
          {t('eyebrow')}
        </p>
        <h1 className='mt-5 font-heading font-semibold text-6xl tracking-[-0.04em]'>
          {t('title')}
        </h1>
        <p className='mt-6 max-w-md text-merakai-navy/75 leading-relaxed'>
          {t('intro')}
        </p>
      </div>
      <div className='merakai-fold merakai-fold--aside lg:col-span-7'>
        <ContactForm email={getPublicContactEmail()} />
      </div>
    </section>
  )
}

export default ContactPage
