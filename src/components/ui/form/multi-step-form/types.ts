import type { FormHTMLAttributes, ReactNode } from 'react'
import type { ZodType } from 'zod'

export interface MultiStepFormProps<T>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode
  initialData?: Partial<T>
  initialStep?: number
  stepSchemas?: ZodType[]
  /** Persist draft in sessionStorage. Defaults to current pathname. Pass false to disable. */
  persistKey?: string | boolean
  /** Maps field keys to human-readable labels shown in validation summary */
  validationFieldLabels?: Record<string, string>
  onStepChange?: (step: number) => void
  onPersist?: (data: Partial<T>, step: number) => void
  onSubmit?: (data: T) => void
  className?: string
}
