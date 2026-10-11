import type { useTranslations } from 'next-intl'
import type ES from './messages/es.json'
import type SiteES from './messages/site/es.json'

export type Messages = Omit<typeof ES, never> & {
  site: typeof SiteES
}

type TFunction = ReturnType<typeof useTranslations<never>>
// biome-ignore lint/suspicious/noExplicitAny: Required for type inference
type ExtractKey<T> = T extends (key: infer K, ...args: any[]) => any ? K : never

export type MessageKey = ExtractKey<TFunction>
