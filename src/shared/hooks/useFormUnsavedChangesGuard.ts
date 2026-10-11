import { useEffect, useRef } from 'react'
import {
  confirmFormUnsavedLeave,
  bypassFormUnsavedGuardOnce,
  registerFormUnsavedGuard,
  unregisterFormUnsavedGuard
} from '~/shared/lib/form/form-unsaved-guard'

interface Options {
  enabled?: boolean
  isDirty: () => boolean
}

export function useFormUnsavedChangesGuard({
  enabled = true,
  isDirty
}: Options) {
  const isDirtyRef = useRef(isDirty)
  isDirtyRef.current = isDirty

  useEffect(() => {
    if (!enabled) {
      unregisterFormUnsavedGuard()
      return
    }

    registerFormUnsavedGuard({
      checkDirty: () => isDirtyRef.current()
    })

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirtyRef.current()) return

      event.preventDefault()
      event.returnValue = ''
    }

    const handlePopState = () => {
      if (!isDirtyRef.current()) return

      history.go(1)

      void confirmFormUnsavedLeave().then((canLeave) => {
        if (!canLeave) return

        bypassFormUnsavedGuardOnce()
        history.back()
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
      unregisterFormUnsavedGuard()
    }
  }, [enabled])
}
