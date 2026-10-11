/**
 * Shared validation error messages for API routes
 * These are thrown from route handlers and mapped to Spanish i18n keys via error-messages.ts
 */
export const VALIDATION_ERRORS = {
  PARAMETER_REQUIRED: 'Parameter is required',
  INVALID_PARAMETER: 'Invalid parameter',
  RESOURCE_NOT_FOUND: 'Resource not found',
  DELETE_FAILED: 'Delete operation failed'
} as const
