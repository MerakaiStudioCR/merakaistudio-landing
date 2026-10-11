/**
 * Utility functions for form field ID generation and error handling
 */

/**
 * Generates a field ID from a label string
 * @param label - The label text to generate an ID from
 * @returns A sanitized field ID (e.g., "field-user-name" from "User Name")
 */
export const generateFieldId = (label?: string): string => {
  if (!label) return ''
  return `field-${label.trim().toLowerCase().replace(/\s+/g, '-')}`
}

/**
 * Generates an error ID for a form field
 * @param fieldId - The field ID to create an error ID for
 * @param hasError - Whether the field has an error
 * @returns The error ID if there's an error, undefined otherwise
 */
export const generateErrorId = (
  fieldId?: string,
  hasError?: boolean
): string | undefined => {
  return hasError && fieldId ? `${fieldId}-error` : undefined
}
