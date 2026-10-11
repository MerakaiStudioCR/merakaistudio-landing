import { describe, expect, it } from 'vitest'
import { isSessionSelectionPath, shouldHideSidebar } from './constants'

describe('sidebar path helpers', () => {
  it('detects session selection routes', () => {
    expect(isSessionSelectionPath('/bootstrap')).toBe(true)
    expect(isSessionSelectionPath('/select-tenant')).toBe(true)
    expect(isSessionSelectionPath('/select-asada')).toBe(true)
    expect(isSessionSelectionPath('/setup')).toBe(true)
    expect(isSessionSelectionPath('/dashboard')).toBe(false)
  })

  it('hides the sidebar on selection, settings and admin routes', () => {
    expect(shouldHideSidebar('/bootstrap')).toBe(true)
    expect(shouldHideSidebar('/settings')).toBe(true)
    expect(shouldHideSidebar('/admin/tenants')).toBe(true)
    expect(shouldHideSidebar('/readings')).toBe(false)
  })
})
