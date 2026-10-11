import { describe, it, expect } from 'vitest'
import { generateFieldId, generateErrorId } from './fields'

describe('Form Field Utils', () => {
  describe('generateFieldId', () => {
    it('should generate ID from simple label', () => {
      expect(generateFieldId('Email')).toBe('field-email')
    })

    it('should handle labels with multiple words', () => {
      expect(generateFieldId('User Name')).toBe('field-user-name')
    })

    it('should handle labels with multiple consecutive spaces', () => {
      expect(generateFieldId('User   Name')).toBe('field-user-name')
    })

    it('should handle labels with leading/trailing spaces', () => {
      // Multiple consecutive spaces become a single hyphen
      expect(generateFieldId('  Email  ')).toBe('field-email')
    })

    it('should convert uppercase to lowercase', () => {
      expect(generateFieldId('FIRST NAME')).toBe('field-first-name')
    })

    it('should handle mixed case labels', () => {
      expect(generateFieldId('FirstName')).toBe('field-firstname')
    })

    it('should handle special characters', () => {
      expect(generateFieldId('User@Name')).toBe('field-user@name')
    })

    it('should return empty string for undefined label', () => {
      expect(generateFieldId(undefined)).toBe('')
    })

    it('should return empty string for empty string label', () => {
      expect(generateFieldId('')).toBe('')
    })

    it('should handle single word labels', () => {
      expect(generateFieldId('Email')).toBe('field-email')
    })

    it('should handle labels with numbers', () => {
      expect(generateFieldId('Phone Number 1')).toBe('field-phone-number-1')
    })

    it('should handle labels with hyphens', () => {
      expect(generateFieldId('Last-Name')).toBe('field-last-name')
    })

    it('should handle labels starting with numbers', () => {
      expect(generateFieldId('1st Priority')).toBe('field-1st-priority')
    })
  })

  describe('generateErrorId', () => {
    it('should generate error ID when fieldId and hasError are provided', () => {
      expect(generateErrorId('field-email', true)).toBe('field-email-error')
    })

    it('should return undefined when hasError is false', () => {
      expect(generateErrorId('field-email', false)).toBeUndefined()
    })

    it('should return undefined when fieldId is undefined', () => {
      expect(generateErrorId(undefined, true)).toBeUndefined()
    })

    it('should return undefined when fieldId is empty string', () => {
      expect(generateErrorId('', true)).toBeUndefined()
    })

    it('should return undefined when both parameters are falsy', () => {
      expect(generateErrorId(undefined, false)).toBeUndefined()
      expect(generateErrorId('', false)).toBeUndefined()
    })

    it('should handle complex field IDs', () => {
      expect(generateErrorId('field-user-name', true)).toBe(
        'field-user-name-error'
      )
    })

    it('should handle field IDs with special characters', () => {
      expect(generateErrorId('field-user@email', true)).toBe(
        'field-user@email-error'
      )
    })

    it('should handle numeric field IDs', () => {
      expect(generateErrorId('field-123', true)).toBe('field-123-error')
    })
  })
})
