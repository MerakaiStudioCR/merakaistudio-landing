import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * Returns false during SSR and the hydration pass, true after the client has mounted.
 * Use to defer client-only UI (e.g. permission-filtered nav) and avoid hydration mismatches.
 */
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

export default useIsClient
