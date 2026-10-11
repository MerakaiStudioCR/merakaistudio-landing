/**
 * Helper function to add filter parameters to URL
 * Only adds parameter if value is defined
 *
 * @param url - URL object to add parameter to
 * @param key - Parameter key
 * @param value - Parameter value (only added if not undefined)
 */
export function addFilterParam(
  url: URL,
  key: string,
  value: string | number | boolean | undefined
): void {
  if (value !== undefined && value !== null && value !== '') {
    url.searchParams.set(key, String(value))
  }
}
