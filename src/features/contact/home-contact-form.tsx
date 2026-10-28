'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRef, useState, type ReactNode, type RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { submitContact } from './action'
import type { ContactResultCode } from './process'
import { contactFieldSchema, type ContactFields } from './schema'

const HomeContactForm = ({ email }: { email?: string }) => {
  const t = useTranslations('site.contact')
  const home = useTranslations('site.home.cta')
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<ContactResultCode | null>(null)
  const [kind, setKind] = useState('')
  const kinds = [1, 2, 3, 4] as const
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
      reason: 'other',
      message: '',
      privacy: false
    }
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null)
    const prefix = kind ? `[${kind}] ` : ''
    const message = values.message.startsWith(prefix)
      ? values.message
      : `${prefix}${values.message}`.slice(0, 4000)
    const result = await submitContact({
      ...values,
      message,
      reason: 'other',
      company: values.company,
      country: values.country,
      website: honeypot.current?.value ?? '',
      startedAt: startedAt.current
    })
    setStatus(result.code)
  })

  return (
    <>
      <fieldset className='project-choices'>
        <legend className='sr-only'>{home('kindLabel')}</legend>
        {kinds.map((item) => {
          const label = home(`kind${item}`)
          return (
            <button
              key={label}
              className='project-choice'
              type='button'
              aria-pressed={kind === label}
              onClick={() => setKind(kind === label ? '' : label)}
            >
              {label}
            </button>
          )
        })}
      </fieldset>
      <form onSubmit={onSubmit} noValidate>
        <Honeypot inputRef={honeypot} />
        <div className='contact-field-row'>
          <Field
            id='home-name'
            label={home('name')}
            error={errors.fullName ? t('errors.fullName') : undefined}
          >
            <input
              {...register('fullName')}
              id='home-name'
              autoComplete='name'
              placeholder={home('namePlaceholder')}
              aria-invalid={Boolean(errors.fullName)}
            />
          </Field>
          <Field
            id='home-email'
            label={home('email')}
            error={errors.email ? t('errors.email') : undefined}
          >
            <input
              {...register('email')}
              id='home-email'
              type='email'
              autoComplete='email'
              placeholder={home('emailPlaceholder')}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
        </div>
        <Field
          id='home-message'
          label={home('message')}
          error={errors.message ? t('errors.message') : undefined}
        >
          <textarea
            {...register('message')}
            id='home-message'
            rows={5}
            placeholder={
              kind
                ? home('kindPlaceholder', { kind })
                : home('messagePlaceholder')
            }
            aria-invalid={Boolean(errors.message)}
          />
        </Field>
        <label className='check'>
          <input
            {...register('privacy')}
            type='checkbox'
            aria-invalid={Boolean(errors.privacy)}
          />
          <span>{t('privacy')}</span>
        </label>
        {errors.privacy ? (
          <p className='field-error' role='alert'>
            {t('errors.privacy')}
          </p>
        ) : null}
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? t('sending') : t('submit')} <span>↗</span>
        </button>
        {status ? (
          <output className='contact-result'>
            {t(`states.${statusMessageKey[status]}`)}
          </output>
        ) : null}
        {email ? (
          <p className='contact-result'>
            {t('direct')} <a href={`mailto:${email}`}>{email}</a>
          </p>
        ) : null}
      </form>
    </>
  )
}

function Field({
  id,
  label,
  error,
  children
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className='field-error' role='alert'>
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

export default HomeContactForm
