import { describe, expect, it } from 'vitest'
import {
  createPrefixedMessageTranslator,
  createScopedMessageTranslator,
  resolveTranslatedErrorMessage,
  translateMessageKey
} from './translate-message-key'

describe('translateMessageKey', () => {
  const translate = (key: string) => `translated:${key}`

  it('translates dynamic keys via safe cast', () => {
    expect(translateMessageKey(translate, 'api.error-messages.generic')).toBe(
      'translated:api.error-messages.generic'
    )
  })
})

describe('resolveTranslatedErrorMessage', () => {
  const translate = (key: string) => `translated:${key}`

  it('maps known API errors to translated keys', () => {
    expect(
      resolveTranslatedErrorMessage(
        translate,
        'Invalid credentials',
        'payments.arrangement.error'
      )
    ).toBe('translated:auth.invalid-credentials')
  })

  it('translates api.* keys directly', () => {
    expect(
      resolveTranslatedErrorMessage(
        translate,
        'api.error-messages.not-found',
        'payments.arrangement.error'
      )
    ).toBe('translated:api.error-messages.not-found')
  })

  it('replaces unknown raw messages with the generic translated key', () => {
    expect(
      resolveTranslatedErrorMessage(
        translate,
        'Something went wrong',
        'payments.arrangement.error'
      )
    ).toBe('translated:api.error-messages.generic')
  })

  it('returns translated fallback when message is empty', () => {
    expect(
      resolveTranslatedErrorMessage(translate, '', 'payments.arrangement.error')
    ).toBe('translated:payments.arrangement.error')
  })
})

describe('createScopedMessageTranslator', () => {
  const scoped = (key: string) => `scoped:${key}`
  const global = (key: string) => `global:${key}`

  it('strips namespace prefix for scoped keys', () => {
    const translate = createScopedMessageTranslator({
      scopedTranslate: scoped,
      globalTranslate: global,
      namespacePrefix: 'operational.corrective-actions.'
    })

    expect(translate('operational.corrective-actions.close-error')).toBe(
      'scoped:close-error'
    )
  })

  it('uses global translate for dotted non-prefixed keys', () => {
    const translate = createScopedMessageTranslator({
      scopedTranslate: scoped,
      globalTranslate: global,
      namespacePrefix: 'operational.corrective-actions.'
    })

    expect(translate('api.error-messages.generic')).toBe(
      'global:api.error-messages.generic'
    )
  })
})

describe('createPrefixedMessageTranslator', () => {
  it('strips namespace prefix when present', () => {
    const translate = createPrefixedMessageTranslator(
      (key) => `scoped:${key}`,
      'operational.alerts.'
    )

    expect(translate('operational.alerts.resolve-error')).toBe(
      'scoped:resolve-error'
    )
    expect(translate('resolve-error')).toBe('scoped:resolve-error')
  })

  it('routes dotted keys through the global translator', () => {
    const translate = createPrefixedMessageTranslator(
      (key) => `scoped:${key}`,
      'operational.alerts.',
      (key) => `global:${key}`
    )

    expect(translate('api.error-messages.generic')).toBe(
      'global:api.error-messages.generic'
    )
  })
})

describe('resolveTranslatedErrorMessage with global translator', () => {
  it('uses global translator for mapped api keys when scoped translate is provided', () => {
    const scoped = (key: string) => `scoped:${key}`
    const global = (key: string) => `global:${key}`

    expect(
      resolveTranslatedErrorMessage(
        scoped,
        'api.error-messages.not-found',
        'alerts.run-error',
        { globalTranslate: global }
      )
    ).toBe('global:api.error-messages.not-found')
  })
})
