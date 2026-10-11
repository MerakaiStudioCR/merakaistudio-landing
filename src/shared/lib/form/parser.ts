const parseBoolean = (value: string): boolean => {
  if (value === 'true' || value === '1' || value === 'on') {
    return true
  }

  return false
}

const parseNumber = (value: string): number | string => {
  if (!value) return 0
  return Number(value)
}

const isBooleanString = (value: string): boolean => {
  return ['true', 'false', '1', '0', 'on', 'off'].includes(value)
}

const isBooleanField = (element: unknown): boolean => {
  if (!element || !(element instanceof HTMLInputElement)) return false
  // Avoid errors when using 1 or 0 in text fields.
  const numericFieldTypes = ['checkbox', 'radio']

  return numericFieldTypes.includes(element.type)
}

const isBooleanHiddenField = (element: unknown): boolean => {
  if (!element || !(element instanceof HTMLInputElement)) return false
  return element.type === 'hidden'
}

/** Hidden numeric IDs (e.g. statusId=1) must not be coerced via checkbox-style 1/0 rules. */
const isExplicitBooleanString = (value: string): boolean =>
  ['true', 'false', 'on', 'off'].includes(value)

const isNumericString = (value: string): boolean => {
  if (!value) return true

  return !Number.isNaN(Number(value)) && value !== ''
}

const isNumericField = (element: unknown): boolean => {
  if (!element || !(element instanceof HTMLInputElement)) return false

  const numericFieldTypes = ['number']

  return numericFieldTypes.includes(element.type)
}

/**
 * Parses FormData with proper type coercion for boolean and number fields
 *
 * @param formData - The FormData object to parse
 * @returns Parsed object with properly typed values
 */
const getTypedFormData = <T = Record<string, unknown>>(
  form: HTMLFormElement
): T => {
  const formData = new FormData(form)
  const result: Record<string, unknown> = {}

  for (const [key, value] of formData.entries()) {
    let parsedValue: unknown = value

    // Only process string values for type coercion
    if (typeof value === 'string') {
      const element = form.elements.namedItem(key)

      // Auto-detect booleans from checkbox/radio, or hidden inputs with true/false values
      if (isBooleanField(element) && isBooleanString(value)) {
        parsedValue = parseBoolean(value)
      } else if (
        isBooleanHiddenField(element) &&
        isExplicitBooleanString(value)
      ) {
        parsedValue = parseBoolean(value)
      }
      // Auto-detect numbers
      else if (isNumericString(value) && isNumericField(element)) {
        parsedValue = parseNumber(value)
      }
    }

    result[key] = parsedValue
  }

  return result as T
}

export default getTypedFormData
