'use client'

import type { FormHTMLAttributes, ReactNode } from 'react'
import FormProgress from './form-progress'
import FormValidationSummary from './form-validation-summary'
import scrollToFirstInvalidField from '../lib/scroll-to-first-invalid-field'
import useFormData from '../hooks/useFormData'
import { cn } from '~/shared/lib/cn'

interface Props<T>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode
  onSubmit?: (data: T) => void
}

const MultiStepFormContent = <T,>({
  children,
  onSubmit,
  className,
  ...formProps
}: Props<T>) => {
  const { formRef, validateAllSteps } = useFormData<T>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validatedData = validateAllSteps()
    if (!validatedData) {
      requestAnimationFrame(() => {
        scrollToFirstInvalidField(event.currentTarget)
      })
      return
    }

    onSubmit?.(validatedData)
  }

  return (
    <form
      ref={formRef}
      noValidate
      className={cn('flex w-full flex-col gap-4', className)}
      {...formProps}
      onSubmit={handleSubmit}
    >
      <FormProgress />
      <FormValidationSummary />
      {children}
    </form>
  )
}

export default MultiStepFormContent
