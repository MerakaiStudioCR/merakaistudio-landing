'use client'

import { AlertCircleIcon } from 'lucide-react'
import useFormData from '../hooks/useFormData'
import useMessages from '~/i18n/useMessages'

const FormValidationSummary = () => {
  const t = useMessages('api.error-messages')
  const { validationErrors, validationFieldLabels } = useFormData()

  const entries = Object.entries(validationErrors).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  )

  if (entries.length === 0) return null

  return (
    <div
      className='mb-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive text-sm'
      role='alert'
      aria-live='polite'
    >
      <AlertCircleIcon className='mt-0.5 size-4 shrink-0' aria-hidden />
      <div className='space-y-2'>
        <p className='font-medium'>{t('validation-error')}</p>
        <ul className='list-disc space-y-1 pl-4'>
          {entries.map(([field, message]) => {
            const label = validationFieldLabels?.[field]

            return (
              <li key={field}>
                {label ? (
                  <>
                    <span className='font-medium'>{label}:</span> {message}
                  </>
                ) : (
                  message
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FormValidationSummary
