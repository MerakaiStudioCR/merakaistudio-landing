'use client'

import { Children, cloneElement, useCallback, useMemo, useRef } from 'react'
import { usePathname } from 'next/navigation'
import FormStep from './components/form-step'
import FormActions from './components/form-actions'
import FormDraftSync from './components/form-draft-sync'
import MultiStepFormUnsavedGuard from './components/multi-step-form-unsaved-guard'
import MultiStepFormContent from './components/multi-step-form-content'
import FormDataProvider from './context/form-data-provider'
import StepProvider from './context/step-provider'
import FormDraftContext from './context/form-draft-context'
import { isFormStepElement } from './lib/is-form-step-element'
import type { MultiStepFormProps } from './types'
import Loader from '~/components/ui/loader'
import {
  clearFormDraft,
  mergeFormDraftInitialData,
  resolveFormDraftKey,
  saveFormDraft
} from '~/shared/lib/form/form-draft'
import { bypassFormUnsavedGuardOnce } from '~/shared/lib/form/form-unsaved-guard'
import { useFormDraftSnapshot } from '~/shared/lib/form/use-form-draft-snapshot'
import { usePurgeCreationFormDraft } from '~/shared/lib/form/use-purge-creation-form-draft'

const MultiStepForm = <T,>({
  onStepChange,
  onSubmit,
  onPersist,
  initialData,
  initialStep,
  stepSchemas,
  persistKey = true,
  validationFieldLabels,
  children,
  ...formProps
}: MultiStepFormProps<T>) => {
  const formRef = useRef<HTMLFormElement>(null)
  const pathname = usePathname()
  const resolvedPersistKey = resolveFormDraftKey(persistKey, pathname)
  const draftSnapshot = useFormDraftSnapshot<T>(resolvedPersistKey)

  usePurgeCreationFormDraft()

  const mergedInitialData = useMemo(() => {
    if (draftSnapshot === 'pending') return initialData ?? {}
    return mergeFormDraftInitialData(initialData, draftSnapshot)
  }, [draftSnapshot, initialData])

  const mergedInitialStep =
    draftSnapshot === 'pending'
      ? (initialStep ?? 1)
      : (draftSnapshot?.currentStep ?? initialStep ?? 1)

  const handlePersist = useCallback(
    (data: Partial<T>, step: number) => {
      onPersist?.(data, step)
      if (resolvedPersistKey) {
        saveFormDraft(resolvedPersistKey, { formData: data, currentStep: step })
      }
    },
    [onPersist, resolvedPersistKey]
  )

  const handleSubmit = useCallback(
    (data: T) => {
      bypassFormUnsavedGuardOnce()
      if (resolvedPersistKey) {
        clearFormDraft(resolvedPersistKey)
      }
      onSubmit?.(data)
    },
    [onSubmit, resolvedPersistKey]
  )

  const clearDraft = useCallback(() => {
    clearFormDraft(resolvedPersistKey)
  }, [resolvedPersistKey])

  const draftContextValue = useMemo(
    () => ({
      persistKey: resolvedPersistKey,
      clearDraft
    }),
    [clearDraft, resolvedPersistKey]
  )

  const [total, steps] = useMemo(() => {
    let totalSteps = 0

    let stepNumber = 0

    const steps = Children.map(children, (child) => {
      if (isFormStepElement(child)) {
        totalSteps++
        stepNumber++
        const props = child.props
        return cloneElement(child, {
          ...props,
          step: props.step ?? stepNumber
        })
      }
      return child
    })

    return [totalSteps, steps]
  }, [children])

  if (draftSnapshot === 'pending') {
    return <Loader className='py-12' />
  }

  return (
    <FormDraftContext.Provider value={draftContextValue}>
      <StepProvider
        totalSteps={total}
        initialStep={mergedInitialStep}
        onStepChange={onStepChange}
      >
        <FormDataProvider
          initialData={mergedInitialData}
          stepSchemas={stepSchemas}
          validationFieldLabels={validationFieldLabels}
          formRef={formRef}
          onPersist={handlePersist}
        >
          <FormDraftSync<T> persistKey={resolvedPersistKey} />
          <MultiStepFormUnsavedGuard<T> baseline={mergedInitialData} />
          <MultiStepFormContent<T> {...formProps} onSubmit={handleSubmit}>
            {steps}
          </MultiStepFormContent>
        </FormDataProvider>
      </StepProvider>
    </FormDraftContext.Provider>
  )
}

MultiStepForm.Step = FormStep
MultiStepForm.Actions = FormActions

export default MultiStepForm
