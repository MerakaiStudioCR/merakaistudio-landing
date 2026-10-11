import { getRequestConfig } from 'next-intl/server'
import uiMessages from './messages/es.json'
import siteEn from './messages/site/en.json'
import siteEs from './messages/site/es.json'
import { isLocale } from './routing'
import type { Messages } from './types'

declare module 'next-intl' {
  interface AppConfig {
    Locale: 'es' | 'en'
    Messages: Messages
  }
}

const siteMessages = {
  es: siteEs,
  en: siteEn
} as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = requested && isLocale(requested) ? requested : 'es'

  return {
    locale,
    messages: {
      ...uiMessages,
      site: siteMessages[locale]
    }
  }
})
