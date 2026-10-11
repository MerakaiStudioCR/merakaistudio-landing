export const API_ERROR_DETAIL_KEYS = [
  'code',
  'pendingInvoiceCount',
  'pendingStatuses',
  'invoiceNumbers',
  'rawMessage'
] as const

export interface ApiErrorDetails {
  code?: string
  pendingInvoiceCount?: number
  pendingStatuses?: string[]
  invoiceNumbers?: string[]
  rawMessage?: string
}

function readRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null
  return value as Record<string, unknown>
}

export function readApiErrorDetails(data: unknown): ApiErrorDetails {
  const record = readRecord(data)
  if (!record) return {}

  const nested = readRecord(record.result)
  const source = {
    ...nested,
    ...record
  }

  const details: ApiErrorDetails = {}
  if (typeof source.code === 'string' && source.code.trim()) {
    details.code = source.code
  }
  if (typeof source.pendingInvoiceCount === 'number') {
    details.pendingInvoiceCount = source.pendingInvoiceCount
  }
  if (Array.isArray(source.pendingStatuses)) {
    details.pendingStatuses = source.pendingStatuses.map(String)
  }
  if (Array.isArray(source.invoiceNumbers)) {
    details.invoiceNumbers = source.invoiceNumbers.map(String)
  }
  if (typeof source.rawMessage === 'string' && source.rawMessage.trim()) {
    details.rawMessage = source.rawMessage
  }

  return details
}

export function assignApiErrorDetails<T extends object>(
  error: T,
  data: unknown
): T & ApiErrorDetails {
  const details = readApiErrorDetails(data)
  return Object.assign(error, details)
}
