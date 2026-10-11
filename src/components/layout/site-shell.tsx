import { getTranslations } from 'next-intl/server'
import SiteFooter from './site-footer'
import SiteHeader from './site-header'

const SiteShell = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations('site.nav')

  return (
    <>
      <a
        href='#content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-merakai-orange focus:px-4 focus:py-2 focus:text-merakai-navy'
      >
        {t('skip')}
      </a>
      <SiteHeader />
      <main id='content' className='flex-1'>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}

export default SiteShell
