type NavigationProgressListener = (isActive: boolean) => void

const listeners = new Set<NavigationProgressListener>()

export function subscribeNavigationProgress(
  listener: NavigationProgressListener
): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function startNavigationProgress(): void {
  listeners.forEach((listener) => listener(true))
}
