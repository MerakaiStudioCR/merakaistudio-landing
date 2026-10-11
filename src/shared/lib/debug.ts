export interface DebugContext {
  component?: string
  action?: string
  userId?: string
  requestId?: string
}

export interface DebugOptions {
  level?: LogLevel
  context?: DebugContext
  showTimestamp?: boolean
}

type LogLevel = 'error' | 'debug'

const mk_debug = (
  message: string,
  data?: unknown,
  options: DebugOptions = {}
) => {
  const { level = 'debug', context = {}, showTimestamp = true } = options

  // Only log in development
  if (process.env.NODE_ENV !== 'development') return

  // Format timestamp to HH:MM:SS
  const timestamp = showTimestamp
    ? new Date().toLocaleTimeString('es-CR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    : ''

  // Build context string
  const contextStr = Object.entries(context)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ')

  const fullMessage = [level.toUpperCase(), contextStr, message, timestamp]
    .filter(Boolean)
    .join(' ')

  switch (level) {
    case 'error':
      console.log(
        `%c${fullMessage}`,
        'color: #C83E4D; font-weight: 600; margin-bottom: 8px;',
        data || ''
      )
      break
    default:
      console.info(
        `%c${fullMessage}`,
        'color: #2D936C; font-weight: 600; margin-bottom: 8px;',
        data || ''
      )
  }
}

// Convenience methods
mk_debug.error = (message: string, data?: unknown, context?: DebugContext) =>
  mk_debug(message, data, { level: 'error', context })

mk_debug.info = (message: string, data?: unknown, context?: DebugContext) =>
  mk_debug(message, data, { level: 'debug', context })

// Make it available globally if running in browser
if (typeof globalThis !== 'undefined') {
  ;(globalThis as Record<string, unknown>).mk_debug = mk_debug
}

export default mk_debug
