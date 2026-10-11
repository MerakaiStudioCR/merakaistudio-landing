import { describe, it, expect, vi, beforeEach } from 'vitest'
import getTypedFormData from './parser'

// Mock HTMLInputElement
class MockHTMLInputElement {
  type: string
  constructor() {
    this.type = 'text'
  }
}

// Replace global HTMLInputElement
vi.stubGlobal('HTMLInputElement', MockHTMLInputElement)

describe('Form Data Parser', () => {
  let mockForm: HTMLFormElement

  beforeEach(() => {
    // Reset mocks before each test
    mockForm = new HTMLFormElement()
  })

  describe('getTypedFormData', () => {
    it('should parse boolean strings correctly from checkbox fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['booleanField', 'true'],
        ['booleanField2', 'false'],
        ['booleanField3', '1'],
        ['booleanField4', '0'],
        ['booleanField5', 'on'],
        ['booleanField6', 'off']
      ]

      // Mock form elements to return checkbox field types
      const mockCheckboxElement = new HTMLInputElement()
      mockCheckboxElement.type = 'checkbox'

      mockForm.elements.namedItem = vi.fn().mockReturnValue(mockCheckboxElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        booleanField: true,
        booleanField2: false,
        booleanField3: true,
        booleanField4: false,
        booleanField5: true,
        booleanField6: false
      })
    })

    it('should NOT parse boolean strings from non-checkbox fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['textField', 'true'],
        ['textField2', '1'],
        ['textField3', 'on']
      ]

      // Mock form elements to return text field types
      const mockTextElement = new HTMLInputElement()
      mockTextElement.type = 'text'

      mockForm.elements.namedItem = vi.fn().mockReturnValue(mockTextElement)

      const result = getTypedFormData(mockForm)

      // Boolean-like strings should be preserved as strings for non-checkbox fields
      expect(result).toEqual({
        textField: 'true',
        textField2: '1',
        textField3: 'on'
      })
    })

    it('should handle the same value differently based on field type', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['textFieldWith42', '42'],
        ['numberFieldWith42', '42'],
        ['textFieldWith1', '1'],
        ['numberFieldWith1', '1']
      ]

      // Mock form elements with different types
      const mockTextElement1 = new HTMLInputElement()
      mockTextElement1.type = 'text'
      const mockNumberElement1 = new HTMLInputElement()
      mockNumberElement1.type = 'number'
      const mockTextElement2 = new HTMLInputElement()
      mockTextElement2.type = 'text'
      const mockNumberElement2 = new HTMLInputElement()
      mockNumberElement2.type = 'number'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockTextElement1)
        .mockReturnValueOnce(mockNumberElement1)
        .mockReturnValueOnce(mockTextElement2)
        .mockReturnValueOnce(mockNumberElement2)

      const result = getTypedFormData(mockForm)

      // Same values should be parsed differently based on field type
      expect(result).toEqual({
        textFieldWith42: '42', // String in text field
        numberFieldWith42: 42, // Number in number field
        textFieldWith1: '1', // String in text field
        numberFieldWith1: 1 // Number in number field
      })
    })

    it('should parse numeric strings for number fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [['numberField', '123']]

      // Mock form elements to return numeric field types
      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockNumberElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        numberField: 123
      })
    })

    it('should preserve strings for non-numeric fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['textField', 'hello world'],
        ['emailField', 'test@example.com']
      ]

      // Mock form elements to return non-numeric field types
      const mockTextElement = new HTMLInputElement()
      mockTextElement.type = 'text'
      const mockEmailElement = new HTMLInputElement()
      mockEmailElement.type = 'email'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockTextElement)
        .mockReturnValueOnce(mockEmailElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        textField: 'hello world',
        emailField: 'test@example.com'
      })
    })

    it('should handle empty form data', () => {
      const result = getTypedFormData(mockForm)

      expect(result).toEqual({})
    })

    it('should handle non-string values', () => {
      // Mock FormData to return non-string values
      const mockEntries = vi.fn().mockReturnValue([
        ['field1', 123],
        ['field2', true],
        ['field3', null]
      ])

      // Override the MockFormData constructor to use our mock entries
      const originalFormData = global.FormData
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      global.FormData = class extends (global.FormData as any) {
        entries() {
          return mockEntries()
        }
        // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      } as any

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        field1: 123,
        field2: true,
        field3: null
      })

      // Restore original FormData
      global.FormData = originalFormData
    })

    it('should handle missing form elements', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['field1', '123'],
        ['field2', '456']
      ]

      // Mock form elements to return null (element not found)
      mockForm.elements.namedItem = vi.fn().mockReturnValue(null)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        field1: '123',
        field2: '456'
      })
    })

    it('should handle mixed field types', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['booleanField', 'true'],
        ['numberField', '123'],
        ['textField', 'hello']
      ]

      // Mock form elements
      const mockBooleanElement = new HTMLInputElement()
      mockBooleanElement.type = 'checkbox'
      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'
      const mockTextElement = new HTMLInputElement()
      mockTextElement.type = 'text'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockBooleanElement)
        .mockReturnValueOnce(mockNumberElement)
        .mockReturnValueOnce(mockTextElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        booleanField: true,
        numberField: 123,
        textField: 'hello'
      })
    })

    it('should handle NaN values in numeric fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [['numberField', 'not-a-number']]

      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'
      mockForm.elements.namedItem = vi.fn().mockReturnValue(mockNumberElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        numberField: 'not-a-number' // Should preserve as string when NaN
      })
    })

    it('should handle invalid numeric strings that result in NaN', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [['numberField', 'abc']]

      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockNumberElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        numberField: 'abc' // Should preserve as string when NaN
      })
    })

    it('should handle empty string values', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['emptyField', ''],
        ['numberField', '']
      ]

      const mockTextElement = new HTMLInputElement()
      mockTextElement.type = 'text'
      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockTextElement)
        .mockReturnValueOnce(mockNumberElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        emptyField: '',
        numberField: 0
      })
    })

    it('should handle boolean-like strings that are not exact matches', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['field1', 'True'], // Capital T
        ['field2', 'FALSE'], // All caps
        ['field3', 'yes'], // Not a boolean string
        ['field4', 'no'] // Not a boolean string
      ]

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        field1: 'True', // Not exact match, preserved as string
        field2: 'FALSE', // Not exact match, preserved as string
        field3: 'yes', // Not boolean string, preserved as string
        field4: 'no' // Not boolean string, preserved as string
      })
    })

    it('should handle numeric strings that are not in numeric fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['textField', '123'],
        ['emailField', '456']
      ]

      const mockTextElement = new HTMLInputElement()
      mockTextElement.type = 'text'
      const mockEmailElement = new HTMLInputElement()
      mockEmailElement.type = 'email'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockTextElement)
        .mockReturnValueOnce(mockEmailElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        textField: '123', // Not a numeric field, preserved as string
        emailField: '456' // Not a numeric field, preserved as string
      })
    })

    it('should handle decimal numbers in numeric fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [['numberField', '123.456']]

      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockNumberElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        numberField: 123.456
      })
    })

    it('should handle negative numbers in numeric fields', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [['numberField', '-123']]

      const mockNumberElement = new HTMLInputElement()
      mockNumberElement.type = 'number'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockNumberElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        numberField: -123
      })
    })

    it('should handle non-HTMLInputElement elements', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [['numberField', '123']]

      // Mock form element to return a non-HTMLInputElement
      const mockNonInputElement = { type: 'number' } // Plain object, not HTMLInputElement
      mockForm.elements.namedItem = vi.fn().mockReturnValue(mockNonInputElement)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        numberField: '123' // Should preserve as string since element is not HTMLInputElement
      })
    })

    it('should handle boolean-like strings when element is missing', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['booleanField', 'true'],
        ['booleanField2', '1'],
        ['booleanField3', 'on']
      ]

      // Mock form elements to return null (element not found)
      mockForm.elements.namedItem = vi.fn().mockReturnValue(null)

      const result = getTypedFormData(mockForm)

      // Boolean-like strings should be preserved as strings when element is missing
      expect(result).toEqual({
        booleanField: 'true',
        booleanField2: '1',
        booleanField3: 'on'
      })
    })

    it('should parse true/false from hidden inputs but preserve numeric hidden IDs', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['taxExemption', 'false'],
        ['statusId', '1']
      ]

      const mockHiddenBoolean = new HTMLInputElement()
      mockHiddenBoolean.type = 'hidden'
      const mockHiddenNumeric = new HTMLInputElement()
      mockHiddenNumeric.type = 'hidden'

      mockForm.elements.namedItem = vi
        .fn()
        .mockReturnValueOnce(mockHiddenBoolean)
        .mockReturnValueOnce(mockHiddenNumeric)

      const result = getTypedFormData(mockForm)

      expect(result).toEqual({
        taxExemption: false,
        statusId: '1'
      })
    })

    it('should handle boolean-like strings when element is not HTMLInputElement', () => {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      ;(mockForm as any)._testData = [
        ['booleanField', 'true'],
        ['booleanField2', 'false']
      ]

      // Mock form element to return a non-HTMLInputElement with checkbox type
      const mockNonInputElement = { type: 'checkbox' } // Plain object, not HTMLInputElement
      mockForm.elements.namedItem = vi.fn().mockReturnValue(mockNonInputElement)

      const result = getTypedFormData(mockForm)

      // Boolean-like strings should be preserved as strings when element is not HTMLInputElement
      expect(result).toEqual({
        booleanField: 'true',
        booleanField2: 'false'
      })
    })
  })
})
