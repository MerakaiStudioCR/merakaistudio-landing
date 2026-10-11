function normalizeSnapshotValue(value: unknown): unknown {
  if (value === null || value === undefined || value === '') {
    return undefined
  }

  if (value instanceof File) {
    return `file:${value.name}:${value.size}:${value.lastModified}`
  }

  if (Array.isArray(value)) {
    return value.map(normalizeSnapshotValue)
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(
        ([key, entryValue]) =>
          [key, normalizeSnapshotValue(entryValue)] as const
      )
      .filter(([, entryValue]) => entryValue !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))

    return Object.fromEntries(entries)
  }

  return value
}

export function serializeFormSnapshot(value: unknown): string {
  return JSON.stringify(normalizeSnapshotValue(value))
}

export function isFormSnapshotDirty(
  current: unknown,
  baseline: unknown
): boolean {
  return serializeFormSnapshot(current) !== serializeFormSnapshot(baseline)
}
