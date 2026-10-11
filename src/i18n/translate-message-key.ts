import { sanitizeApiErrorKey } from '~/shared/api/lib/sanitize-api-error-key'
import type { MessageKey } from './types'

// next-intl translators are contravariant on keys; dynamic keys need a wide parameter type.
// biome-ignore lint/suspicious/noExplicitAny: required to accept scoped/global useTranslations hooks
type TranslateFn = (key: any, ...args: any[]) => string

/** Safe cast for runtime-only i18n keys (API errors, mapped keys, dynamic paths). */
export const asMessageKey = (key: string): MessageKey => key as MessageKey

export const translateMessageKey = (
  translate: TranslateFn,
  key: string
): string => translate(asMessageKey(key))

interface ResolveTranslatedErrorMessageOptions {
  globalTranslate?: TranslateFn
}

const resolveMessageTranslator = (
  key: string,
  scopedTranslate: TranslateFn,
  globalTranslate: TranslateFn
): TranslateFn => {
  if (key.startsWith('api.') || key.includes('.')) {
    return globalTranslate
  }

  return scopedTranslate
}

export const resolveTranslatedErrorMessage = (
  translate: TranslateFn,
  message: string | undefined | null,
  fallbackKey: string,
  options?: ResolveTranslatedErrorMessageOptions
): string => {
  const globalTranslate = options?.globalTranslate ?? translate
  const normalized = message?.trim() ?? ''

  if (!normalized) {
    return translateMessageKey(translate, fallbackKey)
  }

  const errorKey = sanitizeApiErrorKey(normalized)
  const translator = resolveMessageTranslator(
    errorKey,
    translate,
    globalTranslate
  )
  return translateMessageKey(translator, errorKey)
}

export interface ScopedMessageTranslatorOptions {
  scopedTranslate: TranslateFn
  globalTranslate?: TranslateFn
  namespacePrefix?: string
}

export const createScopedMessageTranslator = ({
  scopedTranslate,
  globalTranslate = scopedTranslate,
  namespacePrefix
}: ScopedMessageTranslatorOptions): ((key: string) => string) => {
  return (key: string) => {
    if (namespacePrefix && key.startsWith(namespacePrefix)) {
      return translateMessageKey(
        scopedTranslate,
        key.slice(namespacePrefix.length)
      )
    }

    if (key.startsWith('api.') || key.includes('.')) {
      return translateMessageKey(globalTranslate, key)
    }

    return translateMessageKey(scopedTranslate, key)
  }
}

export const createPrefixedMessageTranslator = (
  translate: TranslateFn,
  namespacePrefix: string,
  globalTranslate?: TranslateFn
): ((key: string) => string) => {
  const global = globalTranslate ?? translate

  return (key: string) => {
    if (key.startsWith(namespacePrefix)) {
      return translateMessageKey(translate, key.slice(namespacePrefix.length))
    }

    const translator = resolveMessageTranslator(key, translate, global)
    return translateMessageKey(translator, key)
  }
}
