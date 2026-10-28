'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Logo from '~/components/brand/logo'
import { Link, usePathname } from '~/i18n/navigation'
import { routing } from '~/i18n/routing'
import { cn } from '~/shared/lib/cn'

const links = [
  { href: '/#estudio', key: 'studio' },
  { href: '/#productos', key: 'products' },
  { href: '/#clientes', key: 'clients' },
  { href: '/#servicios', key: 'services' },
  { href: '/#metodo', key: 'method' }
] as const

const SiteHeader = () => {
  const t = useTranslations('site.nav')
  const meta = useTranslations('site.meta')
  const pathname = usePathname()
  const onHome = pathname === '/'
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const panel = panelRef.current
    const nodes = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('a, button'))
      : []
    nodes[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        onHome
          ? scrolled
            ? 'border-white/10 bg-merakai-navy'
            : 'border-transparent bg-merakai-navy'
          : scrolled
            ? 'border-merakai-navy/10 bg-merakai-paper'
            : 'border-transparent bg-merakai-paper'
      )}
    >
      <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8'>
        {onHome ? (
          <Link
            href='/'
            prefetch={false}
            aria-label={meta('siteName')}
            className='home-lockup'
          >
            <img
              src='/brand/merakai-logo-oficial.png'
              alt=''
              width={1889}
              height={829}
            />
          </Link>
        ) : (
          <Logo label={meta('siteName')} tone='navy' />
        )}
        <nav
          className='hidden items-center gap-8 lg:flex'
          aria-label={t('menu')}
        >
          {links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={cn(
                  'merakai-nav-link font-body text-sm tracking-wide',
                  onHome ? 'text-merakai-paper/85' : 'text-merakai-navy'
                )}
              >
                {t(link.key)}
              </Link>
            )
          })}
        </nav>
        <div className='hidden items-center gap-5 lg:flex'>
          <LanguageSwitcher
            locale={locale}
            label={t('language')}
            tone={onHome ? 'paper' : 'navy'}
          />
          <Link
            href='/#contacto'
            prefetch={false}
            className='merakai-action inline-flex items-center gap-2 bg-merakai-orange px-4 py-2 font-heading font-semibold text-merakai-navy text-sm'
          >
            {t('talk')}
            {onHome ? <span aria-hidden>→</span> : null}
          </Link>
        </div>
        <button
          ref={buttonRef}
          type='button'
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center border lg:hidden',
            onHome ? 'border-white/20' : 'border-merakai-navy/15'
          )}
          aria-expanded={open}
          aria-controls={titleId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className='sr-only'>{open ? t('close') : t('open')}</span>
          <span className='flex w-4 flex-col gap-1.5' aria-hidden>
            <span
              className={cn(
                'h-px',
                onHome ? 'bg-merakai-paper' : 'bg-merakai-navy'
              )}
            />
            <span
              className={cn(
                'h-px',
                onHome ? 'bg-merakai-paper' : 'bg-merakai-navy'
              )}
            />
            <span className='h-px w-3 bg-merakai-orange' />
          </span>
        </button>
      </div>
      {open ? (
        <div
          ref={panelRef}
          id={titleId}
          className={cn(
            'max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t px-5 py-6 lg:hidden',
            onHome
              ? 'border-white/10 bg-merakai-navy text-merakai-paper'
              : 'border-merakai-navy/10 bg-merakai-paper'
          )}
        >
          <nav className='flex flex-col gap-4' aria-label={t('menu')}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className='font-heading text-3xl tracking-[-0.03em]'
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className='mt-8 flex items-center justify-between'>
            <LanguageSwitcher
              locale={locale}
              label={t('language')}
              tone={onHome ? 'paper' : 'navy'}
            />
            <Link
              href='/#contacto'
              prefetch={false}
              className='merakai-action inline-flex items-center gap-2 bg-merakai-orange px-4 py-2 font-heading font-semibold text-merakai-navy text-sm'
              onClick={() => setOpen(false)}
            >
              {t('talk')}
              {onHome ? <span aria-hidden>→</span> : null}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

const LanguageSwitcher = ({
  locale,
  label,
  tone = 'navy'
}: {
  locale: string
  label: string
  tone?: 'navy' | 'paper'
}) => {
  const pathname = usePathname()

  return (
    <nav
      aria-label={label}
      className='flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em]'
    >
      {routing.locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          prefetch={false}
          hrefLang={item}
          aria-current={item === locale ? 'true' : undefined}
          className={cn(
            tone === 'paper'
              ? item === locale
                ? 'text-merakai-paper'
                : 'text-merakai-paper/45'
              : item === locale
                ? 'text-merakai-navy'
                : 'text-merakai-navy/45'
          )}
        >
          {item}
        </Link>
      ))}
    </nav>
  )
}

export default SiteHeader
