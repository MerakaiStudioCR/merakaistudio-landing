import { useTranslations } from 'next-intl'
import { resolveTranslatedErrorMessage } from './translate-message-key'

const useMessages = useTranslations

// Safe helper for runtime error keys with fallback
export const useTranslatedError = (namespace: string = '') => {
  const t = useTranslations(namespace as never)
  const tGlobal = useTranslations()

  return (key: string) =>
    resolveTranslatedErrorMessage(t, key, 'global.generic-error', {
      globalTranslate: tGlobal
    })
}

export { asMessageKey, translateMessageKey } from './translate-message-key'
export {
  createPrefixedMessageTranslator,
  createScopedMessageTranslator,
  resolveTranslatedErrorMessage
} from './translate-message-key'

export default useMessages
