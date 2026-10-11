import { describe, expect, it } from 'vitest'
import { unwrapApiResult } from './unwrap-api-result'

describe('unwrapApiResult', () => {
  it('unwraps result envelope', () => {
    expect(unwrapApiResult({ result: { id: '1' } })).toEqual({ id: '1' })
  })

  it('unwraps legacy data envelope', () => {
    expect(unwrapApiResult({ data: { id: '2' } })).toEqual({ id: '2' })
  })

  it('returns raw payload when no envelope', () => {
    expect(unwrapApiResult({ id: '3' })).toEqual({ id: '3' })
  })
})
