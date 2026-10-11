'use client'

import { useEffect } from 'react'
import toast, { ToastProvider } from '~/components/ui/toast'
import { isStaleChunkError } from './is-stale-chunk-error'

interface GlobalErrorHandlerProps {
  children: React.ReactNode
}

interface ErrorData {
  message: string
  error: Error
}

const STALE_CHUNK_RELOAD_KEY = 'merakai.stale-chunk-reload'

function reloadOnceForStaleChunk(): boolean {
  try {
    if (sessionStorage.getItem(STALE_CHUNK_RELOAD_KEY)) {
      sessionStorage.removeItem(STALE_CHUNK_RELOAD_KEY)
      return false
    }

    sessionStorage.setItem(STALE_CHUNK_RELOAD_KEY, '1')
  } catch {
    window.location.reload()
    return true
  }

  window.location.reload()
  return true
}

const WindowErrorHandler = ({ children }: GlobalErrorHandlerProps) => {
  useEffect(() => {
    const clearReloadFlag = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(STALE_CHUNK_RELOAD_KEY)
      } catch {
        // Ignore storage access errors (private mode).
      }
    }, 3000)

    const sendToLoggingService = (errorData: ErrorData) => {
      mk_debug.error('Global error caught', errorData)
      toast.error('Hubo un error. Por favor, intente nuevamente.')
    }

    const handleError = (event: ErrorEvent) => {
      if (isStaleChunkError(event.error ?? event.message)) {
        event.preventDefault()
        if (reloadOnceForStaleChunk()) return
      }

      event.preventDefault()
      sendToLoggingService({
        message: 'Global error caught',
        error: event?.error || event.message
      })
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (isStaleChunkError(event.reason)) {
        event.preventDefault()
        if (reloadOnceForStaleChunk()) return
      }

      event.preventDefault()
      sendToLoggingService({
        message: 'Promise rejection caught',
        error: event.reason
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.clearTimeout(clearReloadFlag)
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return <>{children}</>
}

const GlobalErrorHandler = ({ children }: GlobalErrorHandlerProps) => {
  return (
    <ToastProvider>
      <WindowErrorHandler>{children}</WindowErrorHandler>
    </ToastProvider>
  )
}

export default GlobalErrorHandler
