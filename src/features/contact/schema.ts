import { z } from 'zod'

export const contactReasons = [
  'software',
  'zaffiro',
  'kizvna',
  'vytal',
  'partnership',
  'other'
] as const

export type ContactReason = (typeof contactReasons)[number]

export const contactFieldSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160),
  country: z.string().trim().max(80),
  reason: z.enum(contactReasons),
  message: z.string().trim().min(20).max(4000),
  privacy: z.boolean().refine((value) => value)
})

export const contactSubmissionSchema = contactFieldSchema.extend({
  website: z.string().max(200),
  startedAt: z.number()
})

export type ContactFields = z.infer<typeof contactFieldSchema>
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>

export type ContactGuard = 'ok' | 'rejected' | 'too-fast' | 'expired'

const MIN_ELAPSED_MS = 3000
const MAX_ELAPSED_MS = 1000 * 60 * 120

export function assessContactGuards(input: {
  website: string
  startedAt: number
  now: number
}): ContactGuard {
  if (input.website.trim().length > 0) return 'rejected'
  const elapsed = input.now - input.startedAt
  if (!Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) return 'too-fast'
  if (elapsed > MAX_ELAPSED_MS) return 'expired'
  return 'ok'
}
