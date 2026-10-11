'use client'

import { useCallback, useEffect, useRef } from 'react'
import useFormData from '~/components/ui/form/multi-step-form/hooks/useFormData'
import useStepNavigation from '~/components/ui/form/multi-step-form/hooks/useStepNavigation'
import getTypedFormData from '~/shared/lib/form/parser'
import {
  isFormSnapshotDirty,
  serializeFormSnapshot
} from '~/shared/lib/form/is-form-snapshot-dirty'
import { useFormUnsavedChangesGuard } from '~/shared/hooks/useFormUnsavedChangesGuard'

interface Props<T> {
  baseline: Partial<T>
  enabled?: boolean
}

const readCurrentSnapshot = <T,>(
  formRef: React.RefObject<HTMLFormElement | null>,
  formData: T
): Partial<T> => {
  if (!formRef.current) return formData as Partial<T>

  const fromForm = getTypedFormData<T>(formRef.current)

  return {
    ...formData,
    ...Object.fromEntries(
      Object.entries(fromForm as Record<string, unknown>).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null
      )
    )
  } as Partial<T>
}

const MultiStepFormUnsavedGuard = <T,>({
  baseline,
  enabled = true
}: Props<T>) => {
  const { formData, formRef } = useFormData<T>()
  const { currentStep } = useStepNavigation()
  const baselineRef = useRef(baseline)
  const hasUserEditedRef = useRef(false)
  const hasUserInteractedRef = useRef(false)
  const domBaselineRef = useRef<string | null>(null)

  baselineRef.current = baseline

  useEffect(() => {
    hasUserEditedRef.current = false
    hasUserInteractedRef.current = false
    domBaselineRef.current = null
  }, [])

  useEffect(() => {
    if (isFormSnapshotDirty(formData, baselineRef.current)) {
      hasUserEditedRef.current = true
    }
  }, [formData])

  useEffect(() => {
    const form = formRef.current
    if (!form || !enabled) return

    const freezeBaseline = () => {
      if (hasUserInteractedRef.current) return
      hasUserInteractedRef.current = true
      domBaselineRef.current = serializeFormSnapshot(
        readCurrentSnapshot(formRef, formData)
      )
    }

    form.addEventListener('pointerdown', freezeBaseline)
    form.addEventListener('keydown', freezeBaseline)

    return () => {
      form.removeEventListener('pointerdown', freezeBaseline)
      form.removeEventListener('keydown', freezeBaseline)
    }
  }, [enabled, formData, formRef])

  const isDirty = useCallback(() => {
    if (hasUserEditedRef.current || currentStep > 1) return true

    const current = serializeFormSnapshot(
      readCurrentSnapshot(formRef, formData)
    )

    if (!hasUserInteractedRef.current) {
      domBaselineRef.current = current
      return false
    }

    if (domBaselineRef.current === null) {
      domBaselineRef.current = current
      return false
    }

    return current !== domBaselineRef.current
  }, [currentStep, formData, formRef])

  useFormUnsavedChangesGuard({ enabled, isDirty })

  return null
}

export default MultiStepFormUnsavedGuard
