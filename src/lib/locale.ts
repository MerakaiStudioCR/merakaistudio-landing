import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { isLocale, type Locale } from '~/i18n/routing'

export async function resolveLocale(locale: string): Promise<Locale> {
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  return locale
}
