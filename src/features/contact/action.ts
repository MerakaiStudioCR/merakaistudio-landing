'use server'

import { headers } from 'next/headers'
import { resolveMailProvider } from './mail'
import { processContact, type ContactResult } from './process'
import { allowContactAttempt } from './rate-limit'

export async function submitContact(input: unknown): Promise<ContactResult> {
  const headerStore = await headers()
  const forwarded = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim()
  const clientKey = forwarded || headerStore.get('x-real-ip') || 'anonymous'

  return processContact(input, {
    now: Date.now(),
    provider: resolveMailProvider(),
    allow: allowContactAttempt,
    clientKey,
    to: process.env.CONTACT_TO?.trim() ?? '',
    from: process.env.CONTACT_FROM?.trim() ?? ''
  })
}
