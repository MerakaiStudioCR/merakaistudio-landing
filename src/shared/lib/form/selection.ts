export const extractSelectionIds = (
  formData: Record<string, unknown>,
  callback: (key: string, value: string) => void
) => {
  Object.entries(formData).forEach(([key]) => {
    // Get everything after the first dash (handles UUIDs with multiple dashes)
    const dashIndex = key.indexOf('-')
    if (dashIndex === -1) return
    const value = key.slice(dashIndex + 1)
    callback(key, value)
  })
}

export const extractArrayValues = (
  formData: Record<string, unknown>,
  fieldName: string
): unknown[] => {
  const values: unknown[] = []
  Object.entries(formData).forEach(([key, value]) => {
    if (key.startsWith(fieldName)) {
      values.push(value)
    }
  })
  return values
}
