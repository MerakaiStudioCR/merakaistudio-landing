import { describe, expect, it, beforeEach } from 'vitest'
import {
  buildFormDraftStorageKey,
  clearFormDraft,
  isCreationFormRoute,
  loadFormDraft,
  mergeFormDraftInitialData,
  purgeCreationFormDraft,
  resolveFormDraftKey,
  saveFormDraft
} from './form-draft'

const KEY = 'onboarding'
const STORAGE_KEY = buildFormDraftStorageKey(KEY)

describe('form-draft', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('resolves draft keys', () => {
    expect(resolveFormDraftKey(false, '/auth/onboarding')).toBeUndefined()
    expect(resolveFormDraftKey(undefined, '/auth/onboarding')).toBeUndefined()
    expect(resolveFormDraftKey(true, '/auth/onboarding')).toBe(
      '/auth/onboarding'
    )
    expect(resolveFormDraftKey('custom-key', '/auth/onboarding')).toBe(
      'custom-key'
    )
  })

  it('detects creation routes', () => {
    expect(isCreationFormRoute('/connections/new')).toBe(true)
    expect(isCreationFormRoute('/settings/team/new')).toBe(true)
    expect(isCreationFormRoute('/connections/abc/edit')).toBe(false)
    expect(isCreationFormRoute('/admin/tenants/1/asadas')).toBe(false)
  })

  it('does not persist drafts on creation routes by default', () => {
    expect(resolveFormDraftKey(true, '/connections/new')).toBeUndefined()
    expect(resolveFormDraftKey(true, '/customers/new')).toBeUndefined()
  })

  it('purges legacy creation drafts for the current route', () => {
    saveFormDraft('/connections/new', {
      formData: { name: 'Draft connection' }
    })

    purgeCreationFormDraft('/connections/new')

    expect(loadFormDraft('/connections/new')).toBeNull()
  })

  it('saves, loads, and clears draft data', () => {
    saveFormDraft(KEY, {
      currentStep: 2,
      formData: { organizationName: 'Junta Test' }
    })

    expect(loadFormDraft<{ organizationName: string }>(KEY)).toEqual({
      currentStep: 2,
      formData: { organizationName: 'Junta Test' },
      savedAt: expect.any(String)
    })

    clearFormDraft(KEY)
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('merges draft data over initial data', () => {
    const merged = mergeFormDraftInitialData(
      { organizationName: 'Initial' },
      {
        formData: { organizationName: 'Draft' },
        savedAt: new Date().toISOString()
      }
    )

    expect(merged.organizationName).toBe('Draft')
  })
})
