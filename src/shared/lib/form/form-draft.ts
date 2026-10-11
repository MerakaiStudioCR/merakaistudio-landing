const DRAFT_PREFIX = 'zaffiro:form-draft:'

export interface FormDraft<T = Record<string, unknown>> {
  formData: Partial<T>
  currentStep?: number
  savedAt: string
}

export const buildFormDraftStorageKey = (key: string): string =>
  `${DRAFT_PREFIX}${key}`

const CREATION_ROUTE_PATTERN = /\/new(?:\/|$)/

export const isCreationFormRoute = (pathname?: string): boolean => {
  if (!pathname) return false

  const normalized = pathname.split('?')[0]?.split('#')[0] ?? pathname
  return CREATION_ROUTE_PATTERN.test(normalized)
}

export const resolveFormDraftKey = (
  persistKey: string | boolean | undefined,
  pathname?: string
): string | undefined => {
  if (persistKey === false || persistKey === undefined) return undefined
  if (typeof persistKey === 'string' && persistKey.trim()) {
    return persistKey.trim()
  }
  if (persistKey === true && pathname) {
    if (isCreationFormRoute(pathname)) return undefined
    return pathname
  }
  return undefined
}

/** Removes stale sessionStorage drafts left from previous creation sessions. */
export const purgeCreationFormDraft = (pathname?: string): void => {
  if (!pathname || !isCreationFormRoute(pathname)) return
  clearFormDraft(pathname)
}

export const loadFormDraft = <T = Record<string, unknown>>(
  key: string | undefined
): FormDraft<T> | null => {
  if (!key || typeof window === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(buildFormDraftStorageKey(key))
    if (!raw) return null

    const parsed = JSON.parse(raw) as FormDraft<T>
    if (!parsed || typeof parsed !== 'object') return null

    if (
      parsed.currentStep !== undefined &&
      (typeof parsed.currentStep !== 'number' || parsed.currentStep < 1)
    ) {
      return null
    }

    return {
      formData: parsed.formData ?? {},
      currentStep: parsed.currentStep,
      savedAt: parsed.savedAt ?? new Date().toISOString()
    }
  } catch (error) {
    mk_debug.error('Failed to load form draft', { error, key })
    return null
  }
}

export const saveFormDraft = <T = Record<string, unknown>>(
  key: string | undefined,
  draft: Pick<FormDraft<T>, 'formData'> & { currentStep?: number }
): void => {
  if (!key || typeof window === 'undefined') return

  try {
    const payload: FormDraft<T> = {
      formData: draft.formData,
      currentStep: draft.currentStep,
      savedAt: new Date().toISOString()
    }
    sessionStorage.setItem(
      buildFormDraftStorageKey(key),
      JSON.stringify(payload)
    )
  } catch (error) {
    mk_debug.error('Failed to save form draft', { error, key })
  }
}

export const clearFormDraft = (key: string | undefined): void => {
  if (!key || typeof window === 'undefined') return

  try {
    sessionStorage.removeItem(buildFormDraftStorageKey(key))
  } catch (error) {
    mk_debug.error('Failed to clear form draft', { error, key })
  }
}

export const mergeFormDraftInitialData = <T>(
  initialData: Partial<T> | undefined,
  draft: FormDraft<T> | null | undefined
): Partial<T> => ({
  ...(initialData ?? {}),
  ...(draft?.formData ?? {})
})
