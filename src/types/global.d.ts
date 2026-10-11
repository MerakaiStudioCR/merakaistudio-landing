import type { DebugContext, DebugOptions } from '~/shared/lib/debug'

// Global type declarations for mk_debug
declare global {
  const mk_debug: {
    (message: string, data?: unknown, options?: DebugOptions): void
    error: (message: string, data?: unknown, context?: DebugContext) => void
    warn: (message: string, data?: unknown, context?: DebugContext) => void
    info: (message: string, data?: unknown, context?: DebugContext) => void
  }
}
