import { describe, expect, it } from 'vitest'
import { buildExpiredCookieHeader } from './build-expired-cookie-header'

describe('buildExpiredCookieHeader', () => {
  it('expires cookies with Max-Age=0 and never includes past Expires (Azure SWA)', () => {
    const header = buildExpiredCookieHeader('auth-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    })

    expect(header).toBe(
      'auth-token=; Path=/; Max-Age=0; SameSite=Strict; HttpOnly; Secure'
    )
    expect(header).not.toMatch(/Expires=/i)
  })

  it('omits HttpOnly/Secure when disabled', () => {
    const header = buildExpiredCookieHeader('asada-id-ui', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax'
    })

    expect(header).toBe('asada-id-ui=; Path=/; Max-Age=0; SameSite=Lax')
    expect(header).not.toMatch(/HttpOnly/i)
    expect(header).not.toMatch(/Secure/i)
    expect(header).not.toMatch(/Expires=/i)
  })
})
