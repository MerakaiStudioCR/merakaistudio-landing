'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '~/i18n/navigation'
import { routing } from '~/i18n/routing'

interface KizvnaCinemaNavProps {
  home: string
  vision: string
  production: string
  creators: string
  essence: string
  menu: string
  open: string
  close: string
  primary: string
}

export function KizvnaCinemaNav({
  home,
  vision,
  production,
  creators,
  essence,
  menu,
  open,
  close,
  primary
}: KizvnaCinemaNavProps) {
  const locale = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    const closeMenu = () => setIsOpen(false)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', closeMenu)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', closeMenu)
    }
  }, [])

  return (
    <header className={isScrolled ? 'nav is-scrolled' : 'nav'} id='top'>
      <a href='#inicio' className='wordmark' aria-label={home}>
        KIZVNA<span>®</span>
      </a>
      <nav
        aria-label={primary}
        id='navlinks'
        className={isOpen ? 'open' : undefined}
      >
        <a href='#vision'>{vision}</a>
        <a href='#cine'>{production}</a>
        <a href='#creadores'>{creators}</a>
        <a href='#codigo'>{essence}</a>
        <span className='nav-locale'>
          {routing.locales.map((item) => (
            <Link
              key={item}
              href={pathname}
              locale={item}
              prefetch={false}
              hrefLang={item}
              aria-current={item === locale ? 'true' : undefined}
            >
              {item}
            </Link>
          ))}
        </span>
      </nav>
      <Link className='parent-link' href='/#productos' prefetch={false}>
        MERAKAI STUDIO <span>↗</span>
      </Link>
      <button
        className='nav-toggle'
        type='button'
        aria-label={isOpen ? close : open}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {menu} <span>{isOpen ? '×' : '+'}</span>
      </button>
    </header>
  )
}
