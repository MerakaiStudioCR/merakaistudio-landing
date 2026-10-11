import { vi } from 'vitest'

/**
 * Global service mocks for testing
 */

// Mock mk_debug (used globally without importing it)
const mockDebug = vi.fn()
;(globalThis as Record<string, unknown>).mk_debug = {
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  ...mockDebug
}
