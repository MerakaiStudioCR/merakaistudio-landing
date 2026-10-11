import { describe, it, expect, vi } from 'vitest'
import { extractSelectionIds, extractArrayValues } from './selection'

describe('Selection Tools', () => {
  describe('extractSelectionIds', () => {
    it('should extract IDs from form data keys and call callback', () => {
      const formData = {
        'field-123': 'value1',
        'field-456': 'value2',
        'field-789': 'value3'
      }

      const callback = vi.fn()
      extractSelectionIds(formData, callback)

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenCalledWith('field-123', '123')
      expect(callback).toHaveBeenCalledWith('field-456', '456')
      expect(callback).toHaveBeenCalledWith('field-789', '789')
    })

    it('should handle empty form data', () => {
      const formData = {}
      const callback = vi.fn()

      extractSelectionIds(formData, callback)

      expect(callback).not.toHaveBeenCalled()
    })

    it('should skip keys without dashes', () => {
      const formData = {
        field123: 'value1',
        field456: 'value2'
      }

      const callback = vi.fn()
      extractSelectionIds(formData, callback)

      expect(callback).not.toHaveBeenCalled()
    })

    it('should handle keys with multiple dashes (UUIDs)', () => {
      const formData = {
        'field-550e8400-e29b-41d4-a716-446655440000': 'value1',
        'field-6ba7b810-9dad-11d1-80b4-00c04fd430c8': 'value2'
      }

      const callback = vi.fn()
      extractSelectionIds(formData, callback)

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith(
        'field-550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440000'
      )
      expect(callback).toHaveBeenCalledWith(
        'field-6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
      )
    })

    it('should handle keys starting with dash', () => {
      const formData = {
        '-123': 'value1',
        '-456': 'value2'
      }

      const callback = vi.fn()
      extractSelectionIds(formData, callback)

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith('-123', '123')
      expect(callback).toHaveBeenCalledWith('-456', '456')
    })

    it('should handle mixed key formats (skip keys without dashes)', () => {
      const formData = {
        'field-123': 'value1',
        field456: 'value2',
        'field-789-extra': 'value3',
        normalField: 'value4'
      }

      const callback = vi.fn()
      extractSelectionIds(formData, callback)

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith('field-123', '123')
      expect(callback).toHaveBeenCalledWith('field-789-extra', '789-extra')
    })
  })

  describe('extractArrayValues', () => {
    it('should extract values by field name prefix', () => {
      const formData = {
        'items-0': 'value1',
        'items-1': 'value2',
        'items-2': 'value3',
        'other-0': 'value4'
      }

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual(['value1', 'value2', 'value3'])
    })

    it('should return empty array when no matching fields', () => {
      const formData = {
        'items-0': 'value1',
        'items-1': 'value2'
      }

      const result = extractArrayValues(formData, 'nonexistent')

      expect(result).toEqual([])
    })

    it('should handle empty form data', () => {
      const formData = {}

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual([])
    })

    it('should handle single matching field', () => {
      const formData = {
        'items-0': 'value1',
        'other-0': 'value2'
      }

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual(['value1'])
    })

    it('should handle non-string values', () => {
      const formData = {
        'items-0': 123,
        'items-1': true,
        'items-2': null,
        'items-3': 'value'
      }

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual([123, true, null, 'value'])
    })

    it('should handle fields with different separators', () => {
      const formData = {
        items_0: 'value1',
        'items-1': 'value2',
        'items.2': 'value3'
      }

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual(['value1', 'value2', 'value3'])
    })

    it('should handle exact field name match', () => {
      const formData = {
        items: 'value1',
        'items-0': 'value2'
      }

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual(['value1', 'value2'])
    })

    it('should handle fields that start with the prefix but are longer', () => {
      const formData = {
        'items-0': 'value1',
        'itemsExtended-0': 'value2',
        'items-1': 'value3'
      }

      const result = extractArrayValues(formData, 'items')

      expect(result).toEqual(['value1', 'value2', 'value3'])
    })

    it('should handle empty string prefix', () => {
      const formData = {
        field1: 'value1',
        field2: 'value2'
      }

      const result = extractArrayValues(formData, '')

      expect(result).toEqual(['value1', 'value2'])
    })
  })
})
