import { describe, expect, it } from 'vitest'
import { shouldStartLinkNavigationProgress } from './guarded-navigation'
import type { MouseEvent } from 'react'

const click = (
  overrides: Partial<MouseEvent<HTMLAnchorElement>> = {}
): MouseEvent<HTMLAnchorElement> =>
  ({
    defaultPrevented: false,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    button: 0,
    ...overrides
  }) as MouseEvent<HTMLAnchorElement>

describe('shouldStartLinkNavigationProgress', () => {
  it('starts progress for a same-origin in-app navigation', () => {
    expect(
      shouldStartLinkNavigationProgress(
        click(),
        '/settings/team',
        '/settings/team/user-1'
      )
    ).toBe(true)
  })

  it('does not start progress for the current path', () => {
    expect(
      shouldStartLinkNavigationProgress(
        click(),
        '/settings/team',
        '/settings/team'
      )
    ).toBe(false)
  })

  it('does not start progress for modified or prevented clicks', () => {
    expect(
      shouldStartLinkNavigationProgress(
        click({ metaKey: true }),
        '/settings/team',
        '/settings/team/user-1'
      )
    ).toBe(false)
    expect(
      shouldStartLinkNavigationProgress(
        click({ defaultPrevented: true }),
        '/settings/team',
        '/settings/team/user-1'
      )
    ).toBe(false)
  })
})
