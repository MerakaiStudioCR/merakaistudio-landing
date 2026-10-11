import { describe, expect, it } from 'vitest'
import { resolveMailProvider } from './mail'
import { processContact } from './process'
import { assessContactGuards, contactFieldSchema } from './schema'

const now = 1_000_000

const valid = {
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  company: '',
  country: '',
  reason: 'software',
  message: 'Queremos conversar sobre un producto digital.',
  privacy: true,
  website: '',
  startedAt: now - 10_000
}

describe('contact', () => {
  it('accepts a complete submission and rejects an invalid email', () => {
    expect(contactFieldSchema.safeParse(valid).success).toBe(true)
    expect(
      contactFieldSchema.safeParse({ ...valid, email: 'no-es-correo' }).success
    ).toBe(false)
  })

  it('rejects honeypot, fast and expired submissions', () => {
    expect(assessContactGuards({ website: 'bot', startedAt: now, now })).toBe(
      'rejected'
    )
    expect(
      assessContactGuards({ website: '', startedAt: now - 500, now })
    ).toBe('too-fast')
    expect(
      assessContactGuards({
        website: '',
        startedAt: now - 1000 * 60 * 121,
        now
      })
    ).toBe('expired')
  })

  it('does not report success when mail is not configured', async () => {
    const result = await processContact(valid, {
      now,
      provider: null,
      allow: () => true,
      clientKey: 'test',
      to: '',
      from: ''
    })

    expect(result).toEqual({ ok: false, code: 'not-configured' })
  })

  it('sends through a configured provider', async () => {
    const sent: unknown[] = []
    const result = await processContact(valid, {
      now,
      provider: {
        async send(message) {
          sent.push(message)
        }
      },
      allow: () => true,
      clientKey: 'test',
      to: 'hola@merakai.studio',
      from: 'web@merakai.studio'
    })

    expect(result).toEqual({ ok: true, code: 'success' })
    expect(sent).toHaveLength(1)
  })

  it('returns no provider unless resend is fully configured', () => {
    expect(resolveMailProvider({})).toBeNull()
    expect(
      resolveMailProvider({
        CONTACT_EMAIL_PROVIDER: 'resend',
        CONTACT_TO: 'hola@merakai.studio',
        CONTACT_FROM: 'web@merakai.studio'
      })
    ).toBeNull()
  })
})
