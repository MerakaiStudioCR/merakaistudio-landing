import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck } from 'lucide-react'
import { createContext, useContext } from 'react'
import FormStepShell from '~/components/ui/form/form-review-step-shell'
import {
  FormReviewPreview,
  FormReviewSection
} from '~/components/ui/form/form-review-preview'
import { cn } from '~/shared/lib/cn'

export type FormMode = 'create' | 'edit'

const FormModeContext = createContext<FormMode>('create')

export function FormModeProvider({
  mode = 'create',
  children
}: {
  mode?: FormMode
  children: React.ReactNode
}) {
  return (
    <FormModeContext.Provider value={mode}>{children}</FormModeContext.Provider>
  )
}

export function useFormMode(): FormMode {
  return useContext(FormModeContext)
}

/** Pick copy for create vs edit flows (i18n strings). */
export function resolveFormModeCopy(
  mode: FormMode,
  createCopy: string,
  editCopy: string
): string {
  return mode === 'edit' ? editCopy : createCopy
}

interface FormStepLayoutProps {
  icon: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'auth'
}

interface FormReviewStepLayoutProps {
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'auth'
}

/** Final review/summary step — clipboard icon + unified preview card. */
export function FormReviewStepLayout({
  title,
  description,
  children,
  className,
  variant = 'default'
}: FormReviewStepLayoutProps) {
  return (
    <FormStepLayout
      icon={ClipboardCheck}
      title={title}
      description={description}
      className={className}
      variant={variant}
    >
      {children}
    </FormStepLayout>
  )
}

/** Multi-step input/review steps — icon header + unified content card. */
export function FormStepLayout({
  icon,
  title,
  description,
  children,
  className,
  variant = 'default'
}: FormStepLayoutProps) {
  return (
    <FormStepShell
      icon={icon}
      title={title}
      description={description}
      className={className}
      variant={variant}
    >
      <FormReviewPreview>{children}</FormReviewPreview>
    </FormStepShell>
  )
}

interface CreateFormShellProps {
  icon: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/** Single-page create/edit forms — same shell without step index. */
export function CreateFormShell({
  icon,
  title,
  description,
  children,
  className
}: CreateFormShellProps) {
  return (
    <FormStepLayout
      icon={icon}
      title={title}
      description={description}
      className={className}
    >
      <FormReviewSection layout='stack'>{children}</FormReviewSection>
    </FormStepLayout>
  )
}

interface CreateFormSectionsProps {
  children: React.ReactNode
  className?: string
}

/** Multiple sections inside one create form card (e.g. sector + subsectors). */
export function CreateFormSections({
  children,
  className
}: CreateFormSectionsProps) {
  return (
    <div className={cn('floating-section p-4 sm:p-6', className)}>
      <div className='divide-y divide-border'>{children}</div>
    </div>
  )
}

export const FORM_FIELD_WRAPPER = 'w-full lg:max-w-80'
export const FORM_SELECT_TRIGGER = 'w-full lg:min-w-80'
