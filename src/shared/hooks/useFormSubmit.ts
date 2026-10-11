import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import getTypedFormData from '~/shared/lib/form/parser'
import {
  clearFormDraft,
  mergeFormDraftInitialData,
  resolveFormDraftKey,
  saveFormDraft
} from '~/shared/lib/form/form-draft'
import { isFormSnapshotDirty } from '~/shared/lib/form/is-form-snapshot-dirty'
import { bypassFormUnsavedGuardOnce } from '~/shared/lib/form/form-unsaved-guard'
import { useFormDraftSnapshot } from '~/shared/lib/form/use-form-draft-snapshot'
import { usePurgeCreationFormDraft } from '~/shared/lib/form/use-purge-creation-form-draft'
import { useFormUnsavedChangesGuard } from '~/shared/hooks/useFormUnsavedChangesGuard'
import type { z } from 'zod'

type Props<T> = {
  schema: z.ZodSchema<T>
  onSubmit: (data: T) => void
  transformData?: (data: T) => T
  initialData?: Partial<T>
  /** Persist draft in sessionStorage. Pass true for pathname, string for custom key, false to disable. */
  persistKey?: string | boolean
  /** Optional full snapshot when form state extends beyond DOM fields. */
  getSnapshot?: () => unknown
  /** Merged with DOM snapshot for dirty detection (e.g. local React state). */
  getExtraSnapshot?: () => unknown
}

const useFormSubmit = <T>({
  schema,
  onSubmit,
  transformData,
  initialData,
  persistKey = true,
  getSnapshot,
  getExtraSnapshot
}: Props<T>) => {
  const pathname = usePathname()
  const formRef = useRef<HTMLFormElement>(null)
  const resolvedPersistKey = resolveFormDraftKey(persistKey, pathname)
  const draftSnapshot = useFormDraftSnapshot<T>(resolvedPersistKey)

  usePurgeCreationFormDraft()

  const resolvedInitialData = useMemo((): Partial<T> => {
    if (draftSnapshot === 'pending') return initialData ?? {}
    return mergeFormDraftInitialData(initialData, draftSnapshot)
  }, [draftSnapshot, initialData])

  const [errors, setErrors] = useState<z.ZodError<T>>()
  const isDraftReady = draftSnapshot !== 'pending'
  const baselineRef = useRef(resolvedInitialData)
  const hasUserEditedRef = useRef(false)

  useEffect(() => {
    baselineRef.current = initialData ?? {}
    hasUserEditedRef.current = false
  }, [initialData])

  const getSnapshotRef = useRef(getSnapshot)
  getSnapshotRef.current = getSnapshot
  const getExtraSnapshotRef = useRef(getExtraSnapshot)
  getExtraSnapshotRef.current = getExtraSnapshot

  const isDirty = useCallback(() => {
    if (hasUserEditedRef.current) return true

    if (getSnapshotRef.current) {
      return isFormSnapshotDirty(getSnapshotRef.current(), baselineRef.current)
    }

    const formCurrent = formRef.current
      ? getTypedFormData<T>(formRef.current)
      : {}
    const extra = getExtraSnapshotRef.current?.() ?? {}
    const current = { ...formCurrent, ...(extra as object) }

    return isFormSnapshotDirty(current, baselineRef.current)
  }, [])

  useFormUnsavedChangesGuard({
    enabled: isDraftReady,
    isDirty
  })

  useEffect(() => {
    const form = formRef.current
    if (!form || !isDraftReady) return

    const markEdited = () => {
      hasUserEditedRef.current = true
    }

    form.addEventListener('input', markEdited)
    form.addEventListener('change', markEdited)

    return () => {
      form.removeEventListener('input', markEdited)
      form.removeEventListener('change', markEdited)
    }
  }, [isDraftReady])

  const clearDraft = useCallback(() => {
    clearFormDraft(resolvedPersistKey)
  }, [resolvedPersistKey])

  useEffect(() => {
    if (!resolvedPersistKey) return

    const persistDraft = () => {
      if (!formRef.current) return

      saveFormDraft(resolvedPersistKey, {
        formData: getTypedFormData<T>(formRef.current) as Partial<T>
      })
    }

    window.addEventListener('beforeunload', persistDraft)
    return () => window.removeEventListener('beforeunload', persistDraft)
  }, [resolvedPersistKey])

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const rawData = getTypedFormData<T>(event.currentTarget)
    const data = transformData ? transformData(rawData) : rawData
    const parsedData = schema.safeParse(data)

    if (parsedData.success) {
      setErrors(undefined)
      clearDraft()
      bypassFormUnsavedGuardOnce()
      onSubmit(parsedData.data)
    } else {
      mk_debug.error('Form validation error', { errors: parsedData.error })
      setErrors(parsedData.error)
    }
  }

  const getError = useCallback(
    (path: keyof T) => {
      return errors?.issues.find((issue) => issue.path[0] === path)?.message
    },
    [errors]
  )

  return {
    formRef,
    onFormSubmit,
    getError,
    resolvedInitialData,
    clearDraft,
    isDraftReady
  }
}

export default useFormSubmit
