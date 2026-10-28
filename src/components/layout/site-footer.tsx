import { getTranslations } from 'next-intl/server'
import { products } from '~/content/products'
import { getPublicContactEmail, getSocialLinks } from '~/content/site'
import { Link } from '~/i18n/navigation'

const explore = [
  { href: '/#estudio', key: 'studio' },
  { href: '/#productos', key: 'products' },
  { href: '/#clientes', key: 'clients' },
  { href: '/#servicios', key: 'services' },
  { href: '/#metodo', key: 'essence' }
] as const

const SiteFooter = async () => {
  const t = await getTranslations('site')
  const year = new Date().getFullYear()
  const email = getPublicContactEmail()
  const social = getSocialLinks()

  return (
    <div className='merakai-landing'>
      <footer>
        <div className='wrap'>
          <div className='footer-grid'>
            <div>
              <Link
                href='/'
                prefetch={false}
                aria-label={t('meta.siteName')}
                className='brand brand-official footer-brand'
              >
                <img
                  src='/brand/merakai-logo-oficial.png'
                  alt=''
                  width={1889}
                  height={829}
                />
              </Link>
              <p>{t('meta.declaration')}</p>
              {email ? <a href={`mailto:${email}`}>{email}</a> : null}
              {social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  rel='noreferrer'
                  target='_blank'
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <h4>{t('footer.explore')}</h4>
              {explore.map((item) => (
                <Link key={item.href} href={item.href} prefetch={false}>
                  {item.key === 'essence'
                    ? t('footer.essence')
                    : t(`nav.${item.key}`)}
                </Link>
              ))}
              <Link href='/about' prefetch={false}>
                {t('nav.about')}
              </Link>
              <Link href='/contact' prefetch={false}>
                {t('nav.contact')}
              </Link>
            </div>
            <div>
              <h4>{t('footer.products')}</h4>
              {products.map((product) =>
                product.status === 'in-development' ? (
                  <span key={product.slug} className='footer-static'>
                    {t(`items.${product.slug}.name`)}
                  </span>
                ) : product.websiteUrl ? (
                  <a
                    key={product.slug}
                    href={product.websiteUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t(`items.${product.slug}.name`)} ↗
                  </a>
                ) : (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    prefetch={false}
                  >
                    {t(`items.${product.slug}.name`)}
                  </Link>
                )
              )}
              <Link href='/privacy' prefetch={false}>
                {t('footer.privacy')}
              </Link>
              <Link href='/terms' prefetch={false}>
                {t('footer.terms')}
              </Link>
            </div>
          </div>
          <div className='footline'>
            <span>
              © {year} {t('footer.rights')}
            </span>
            <span>{t('footer.tagline')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SiteFooter
