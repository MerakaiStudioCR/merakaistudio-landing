import type { Query } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import {
  shouldDehydratePersistedQuery,
  shouldPersistQuery
} from './query-config'

const mockQuery = (
  queryKey: readonly unknown[],
  status: Query['state']['status'] = 'success'
): Query => ({ queryKey, state: { status } }) as Query

describe('shouldPersistQuery', () => {
  it('persists catalog query keys only', () => {
    expect(shouldPersistQuery(mockQuery(['meter-types']))).toBe(true)
    expect(shouldPersistQuery(mockQuery(['countries']))).toBe(true)
  })

  it('does not persist operational list queries', () => {
    expect(shouldPersistQuery(mockQuery(['connections']))).toBe(false)
    expect(shouldPersistQuery(mockQuery(['invoices']))).toBe(false)
    expect(shouldPersistQuery(mockQuery(['asada', 'permissions']))).toBe(false)
  })
})

describe('shouldDehydratePersistedQuery', () => {
  it('dehydrates successful catalog queries', () => {
    expect(shouldDehydratePersistedQuery(mockQuery(['rate-types']))).toBe(true)
  })

  it('does not dehydrate pending or failed catalog queries', () => {
    expect(
      shouldDehydratePersistedQuery(mockQuery(['rate-types'], 'pending'))
    ).toBe(false)
    expect(
      shouldDehydratePersistedQuery(mockQuery(['rate-types'], 'error'))
    ).toBe(false)
  })

  it('does not dehydrate successful operational queries', () => {
    expect(shouldDehydratePersistedQuery(mockQuery(['connections']))).toBe(
      false
    )
  })
})
