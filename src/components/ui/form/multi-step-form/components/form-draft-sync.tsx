'use client'

import { useEffect } from 'react'
import useFormData from '~/components/ui/form/multi-step-form/hooks/useFormData'
import useStepNavigation from '~/components/ui/form/multi-step-form/hooks/useStepNavigation'
import { saveFormDraft } from '~/shared/lib/form/form-draft'
import getTypedFormData from '~/shared/lib/form/parser'

interface Props {
  persistKey?: string
}

const FormDraftSync = <T,>({ persistKey }: Props) => {
  const { formData, formRef } = useFormData<T>()
  const { currentStep } = useStepNavigation()

  useEffect(() => {
    if (!persistKey) return

    const persistDraft = () => {
      const latestData = formRef.current
        ? {
            ...formData,
            ...getTypedFormData<T>(formRef.current)
          }
        : formData

      saveFormDraft(persistKey, {
        formData: latestData as Partial<T>,
        currentStep
      })
    }

    window.addEventListener('beforeunload', persistDraft)
    return () => window.removeEventListener('beforeunload', persistDraft)
  }, [currentStep, formData, formRef, persistKey])

  return null
}

export default FormDraftSync
