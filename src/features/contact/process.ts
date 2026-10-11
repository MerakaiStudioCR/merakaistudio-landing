import type { ContactSubmission } from './schema'
import { assessContactGuards, contactSubmissionSchema } from './schema'
import type { MailProvider } from './mail'

export type ContactResultCode =
  | 'success'
  | 'invalid'
  | 'rejected'
  | 'too-fast'
  | 'expired'
  | 'rate-limited'
  | 'not-configured'
  | 'delivery-failed'

export interface ContactResult {
  ok: boolean
  code: ContactResultCode
}

interface ProcessDeps {
  now: number
  provider: MailProvider | null
  allow: (key: string) => boolean
  clientKey: string
  to: string
  from: string
}

export async function processContact(
  input: unknown,
  deps: ProcessDeps
): Promise<ContactResult> {
  const parsed = contactSubmissionSchema.safeParse(input)
  if (!parsed.success) return { ok: false, code: 'invalid' }

  const guard = assessContactGuards({
    website: parsed.data.website,
    startedAt: parsed.data.startedAt,
    now: deps.now
  })
  if (guard !== 'ok') return { ok: false, code: guard }
  if (!deps.provider) return { ok: false, code: 'not-configured' }
  if (!deps.allow(deps.clientKey)) return { ok: false, code: 'rate-limited' }

  try {
    await deps.provider.send({
      to: deps.to,
      from: deps.from,
      replyTo: parsed.data.email,
      subject: `Merakai Studio — ${parsed.data.reason}`,
      text: formatMessage(parsed.data)
    })
  } catch {
    return { ok: false, code: 'delivery-failed' }
  }

  return { ok: true, code: 'success' }
}

function formatMessage(data: ContactSubmission) {
  return [
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Company: ${data.company || '—'}`,
    `Country: ${data.country || '—'}`,
    `Reason: ${data.reason}`,
    '',
    data.message
  ].join('\n')
}
