import { vi } from 'vitest'

/**
 * DOM-related mocks
 */

// Mock document.cookie for get-current-asada tests
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: ''
})

// Mock FormData and HTMLFormElement for form-data-parser tests
global.FormData = class MockFormData {
  private data = new Map<string, string>()

  constructor(form?: HTMLFormElement) {
    // If we have a form, populate data from the test setup
    // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
    if (form && (form as any)._testData) {
      // biome-ignore lint/suspicious/noExplicitAny: Test mocking requires any type
      this.data = new Map((form as any)._testData)
    }
  }

  append(key: string, value: string) {
    this.data.set(key, value)
  }

  get(key: string) {
    return this.data.get(key) || null
  }

  entries() {
    return this.data.entries()
  }

  has(key: string) {
    return this.data.has(key)
  }

  delete(key: string) {
    this.data.delete(key)
  }

  keys() {
    return this.data.keys()
  }

  values() {
    return this.data.values()
  }

  forEach(callback: (value: string, key: string) => void) {
    this.data.forEach(callback)
  }
} as unknown as typeof FormData

// Mock HTMLFormElement
global.HTMLFormElement = class MockHTMLFormElement {
  elements = {
    namedItem: vi.fn()
  }
  _testData: [string, string][] = []
} as unknown as typeof HTMLFormElement

// Mock HTMLInputElement
global.HTMLInputElement = class MockHTMLInputElement {
  type: string
  constructor() {
    this.type = 'text'
  }
} as unknown as typeof HTMLInputElement
