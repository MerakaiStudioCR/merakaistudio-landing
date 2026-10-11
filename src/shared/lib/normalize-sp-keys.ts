const toCamelCaseKey = (key: string): string => {
  if (!key) return key
  return key.charAt(0).toLowerCase() + key.slice(1)
}

/** Normalizes PascalCase SP row keys to camelCase for domain models. */
export const normalizeSpRow = <T extends Record<string, unknown>>(
  row: Record<string, unknown>
): T => {
  const normalized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(row)) {
    normalized[toCamelCaseKey(key)] = value
  }

  return normalized as T
}

export const normalizeSpRows = <T extends Record<string, unknown>>(
  rows: unknown
): T[] => {
  if (!Array.isArray(rows)) return []

  return rows
    .filter(
      (row): row is Record<string, unknown> => !!row && typeof row === 'object'
    )
    .map((row) => normalizeSpRow<T>(row))
}
