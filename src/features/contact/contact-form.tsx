'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRef, useState, type ReactNode, type RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { submitContact } from './action'
import type { ContactResultCode } from './process'
import {
  contactFieldSchema,
  contactReasons,
  type ContactFields
} from './schema'

const ContactForm = ({ email }: { email?: string }) => {
  const t = useTranslations('site.contact')
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<ContactResultCode | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactFields>({
    resolver: zodResolver(contactFieldSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      country: '',
      reason: 'software',
      message: '',
      privacy: false
    }
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null)
    const result = await submitContact({
      ...values,
      website: honeypot.current?.value ?? '',
      startedAt: startedAt.current
    })
    setStatus(result.code)
  })

  return (
    <form onSubmit={onSubmit} className='space-y-6' noValidate>
      <Honeypot inputRef={honeypot} />
      <Field
        id='contact-name'
        label={t('fullName')}
        error={errors.fullName ? t('errors.fullName') : undefined}
      >
        <input
          {...register('fullName')}
          id='contact-name'
          autoComplete='name'
          className={inputClass}
          aria-invalid={Boolean(errors.fullName)}
        />
      </Field>
      <Field
        id='contact-email'
        label={t('email')}
        error={errors.email ? t('errors.email') : undefined}
      >
        <input
          {...register('email')}
          id='contact-email'
          type='email'
          autoComplete='email'
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>
      <div className='grid gap-6 sm:grid-cols-2'>
        <Field
          id='contact-company'
          label={t('company')}
          hint={t('optional')}
          error={errors.company ? t('errors.company') : undefined}
        >
          <input
            {...register('company')}
            id='contact-company'
            autoComplete='organization'
            className={inputClass}
          />
        </Field>
        <Field
          id='contact-country'
          label={t('country')}
          hint={t('optional')}
          error={errors.country ? t('errors.country') : undefined}
        >
          <input
            {...register('country')}
            id='contact-country'
            autoComplete='country-name'
            className={inputClass}
          />
        </Field>
      </div>
      <Field
        id='contact-reason'
        label={t('reason')}
        error={errors.reason ? t('errors.reason') : undefined}
      >
        <select
          {...register('reason')}
          id='contact-reason'
          className={inputClass}
        >
          {contactReasons.map((reason) => (
            <option key={reason} value={reason}>
              {t(`reasons.${reason}`)}
            </option>
          ))}
        </select>
      </Field>
      <Field
        id='contact-message'
        label={t('message')}
        error={errors.message ? t('errors.message') : undefined}
      >
        <textarea
          {...register('message')}
          id='contact-message'
          rows={6}
          className={inputClass}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>
      <label className='flex items-start gap-3 text-sm leading-relaxed'>
        <input
          {...register('privacy')}
          type='checkbox'
          className='mt-1'
          aria-invalid={Boolean(errors.privacy)}
        />
        <span>{t('privacy')}</span>
      </label>
      {errors.privacy ? (
        <p className='text-merakai-orange text-sm' role='alert'>
          {t('errors.privacy')}
        </p>
      ) : null}
      <button
        type='submit'
        disabled={isSubmitting}
        className='bg-merakai-orange px-5 py-3 font-heading font-semibold text-merakai-navy disabled:opacity-60'
      >
        {isSubmitting ? t('sending') : t('submit')}
      </button>
      {status ? (
        <output className='block text-sm leading-relaxed'>
          {t(`states.${statusMessageKey[status]}`)}
        </output>
      ) : null}
      {email ? (
        <p className='text-merakai-navy/70 text-sm'>
          {t('direct')}{' '}
          <a className='underline' href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      ) : null}
    </form>
  )
}

const inputClass =
  'mt-2 w-full border border-merakai-navy/15 bg-merakai-paper px-3 py-3 text-merakai-navy outline-none'

function Field({
  id,
  label,
  hint,
  error,
  children
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className='block text-sm'>
      <label htmlFor={id} className='font-heading'>
        {label}
        {hint ? (
          <span className='ml-2 font-body text-merakai-navy/50'>{hint}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className='mt-2 text-merakai-orange' role='alert'>
          {error}
        </p>
      ) : null}
    </div>
  )
}

function Honeypot({
  inputRef
}: {
  inputRef: RefObject<HTMLInputElement | null>
}) {
  return (
    <div
      className='-left-[9999px] absolute h-0 w-0 overflow-hidden'
      aria-hidden
    >
      <label>
        Website
        <input ref={inputRef} name='website' tabIndex={-1} autoComplete='off' />
      </label>
    </div>
  )
}

const statusMessageKey = {
  success: 'success',
  invalid: 'invalid',
  rejected: 'rejected',
  'too-fast': 'tooFast',
  expired: 'expired',
  'rate-limited': 'rateLimited',
  'not-configured': 'notConfigured',
  'delivery-failed': 'deliveryFailed'
} as const

export default ContactForm
