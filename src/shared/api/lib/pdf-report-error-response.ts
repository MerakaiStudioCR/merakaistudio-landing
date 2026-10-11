import { NextResponse } from 'next/server'
import { sanitizeApiErrorKey } from './sanitize-api-error-key'

export const PDF_REPORT_PRECONDITION_ERRORS = new Set([
  'ASADA not selected',
  'Tenant not selected'
])

function readStatusCode(error: Error): number | undefined {
  if (
    'statusCode' in error &&
    typeof (error as Error & { statusCode?: unknown }).statusCode === 'number'
  ) {
    return (error as Error & { statusCode: number }).statusCode
  }

  return undefined
}

export function pdfReportErrorResponse(error: unknown) {
  if (!(error instanceof Error)) {
    return NextResponse.json(
      { error: 'api.error-messages.generic' },
      { status: 500 }
    )
  }

  const errorMessage = sanitizeApiErrorKey(error.message)
  const statusCode = readStatusCode(error)

  if (
    error.message === 'Unauthorized' ||
    errorMessage === 'auth.invalid-credentials' ||
    statusCode === 401
  ) {
    return NextResponse.json(
      {
        error:
          errorMessage === 'api.error-messages.generic'
            ? 'auth.invalid-credentials'
            : errorMessage
      },
      { status: 401 }
    )
  }

  if (PDF_REPORT_PRECONDITION_ERRORS.has(error.message)) {
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }

  if (statusCode === 403 || errorMessage.includes('forbidden')) {
    return NextResponse.json(
      {
        error: errorMessage.includes('forbidden')
          ? errorMessage
          : 'api.error-messages.forbidden'
      },
      { status: 403 }
    )
  }

  if (statusCode === 404 || errorMessage.includes('not-found')) {
    return NextResponse.json(
      {
        error: errorMessage.includes('not-found')
          ? errorMessage
          : 'api.error-messages.not-found'
      },
      { status: 404 }
    )
  }

  if (statusCode !== undefined && statusCode >= 400 && statusCode < 500) {
    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }

  return NextResponse.json(
    { error: 'api.error-messages.generic' },
    { status: 500 }
  )
}
