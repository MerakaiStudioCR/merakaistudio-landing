export interface OutboundMessage {
  to: string
  from: string
  replyTo: string
  subject: string
  text: string
}

export interface MailProvider {
  send(message: OutboundMessage): Promise<void>
}

export function resolveMailProvider(
  env: Record<string, string | undefined> = process.env
): MailProvider | null {
  const provider = env.CONTACT_EMAIL_PROVIDER?.trim()
  const to = env.CONTACT_TO?.trim()
  const from = env.CONTACT_FROM?.trim()
  if (!provider || !to || !from) return null

  if (provider !== 'resend') return null

  const key = env.RESEND_API_KEY?.trim()
  if (!key) return null

  return {
    async send(message) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: message.from,
          to: [message.to],
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text
        })
      })

      if (!response.ok) {
        throw new Error('mail-provider-failed')
      }
    }
  }
}
