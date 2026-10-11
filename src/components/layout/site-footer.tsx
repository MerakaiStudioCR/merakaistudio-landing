import { getTranslations } from 'next-intl/server'
import Logo from '~/components/brand/logo'
import { getPublicContactEmail, getSocialLinks } from '~/content/site'
import { products } from '~/content/products'
import { Link } from '~/i18n/navigation'

const SiteFooter = async () => {
  const t = await getTranslations('site')
  const year = new Date().getFullYear()
  const email = getPublicContactEmail()
  const social = getSocialLinks()

  return (
    <footer className='border-merakai-navy/10 border-t bg-merakai-gray'>
      <div className='mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12'>
        <div className='md:col-span-5'>
          <Logo label={t('meta.siteName')} />
          <p className='mt-6 max-w-sm text-merakai-navy/75 text-sm leading-relaxed'>
            {t('footer.blurb')}
          </p>
        </div>
        <div className='md:col-span-3'>
          <p className='font-body text-xs uppercase tracking-[0.18em]'>
            {t('footer.products')}
          </p>
          <ul className='mt-4 space-y-2'>
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  prefetch={false}
                  className='text-sm hover:text-merakai-orange'
                >
                  {t(`items.${product.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='md:col-span-2'>
          <p className='font-body text-xs uppercase tracking-[0.18em]'>
            {t('footer.company')}
          </p>
          <ul className='mt-4 space-y-2 text-sm'>
            <li>
              <Link
                href='/about'
                prefetch={false}
                className='hover:text-merakai-orange'
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                prefetch={false}
                className='hover:text-merakai-orange'
              >
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>
        <div className='md:col-span-2'>
          <p className='font-body text-xs uppercase tracking-[0.18em]'>
            {t('footer.legal')}
          </p>
          <ul className='mt-4 space-y-2 text-sm'>
            <li>
              <Link
                href='/privacy'
                prefetch={false}
                className='hover:text-merakai-orange'
              >
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link
                href='/terms'
                prefetch={false}
                className='hover:text-merakai-orange'
              >
                {t('footer.terms')}
              </Link>
            </li>
          </ul>
          {email ? (
            <a
              href={`mailto:${email}`}
              className='mt-6 block text-sm hover:text-merakai-orange'
            >
              {email}
            </a>
          ) : null}
          {social.length > 0 ? (
            <ul className='mt-4 space-y-2 text-sm'>
              {social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className='hover:text-merakai-orange'
                    rel='noreferrer'
                    target='_blank'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className='border-merakai-navy/10 border-t'>
        <p className='mx-auto w-full max-w-6xl px-5 py-6 text-merakai-navy/60 text-xs sm:px-8'>
          © {year} {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
