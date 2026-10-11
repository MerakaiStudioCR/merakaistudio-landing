export function isStaleChunkError(error: unknown): boolean {
  if (error == null) return false

  const name = error instanceof Error ? error.name : ''
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : ''

  return (
    name === 'ChunkLoadError' ||
    /Failed to load chunk/i.test(message) ||
    /Loading chunk [\w./-]+ failed/i.test(message)
  )
}
