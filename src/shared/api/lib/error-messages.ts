const ERROR_MESSAGES = {
  // Existing mappings
  'Current password is incorrect': 'auth.wrong-current-password',
  'New password must be different from current password':
    'auth.password-same-as-current',
  'Password must be at least 8 characters long': 'auth.password-requirements',
  'Password must contain at least one uppercase letter':
    'auth.password-requirements',
  'Password must contain at least one lowercase letter':
    'auth.password-requirements',
  'Password must contain at least one number': 'auth.password-requirements',
  'Password must contain at least one special character':
    'auth.password-requirements',
  'Auth user not found': 'auth.profile-not-found',
  'Invalid credentials': 'auth.invalid-credentials',
  'Validation failed': 'api.error-messages.validation-error',
  'Email not confirmed': 'auth.email-not-confirmed',
  'ASADA not selected': 'api.error-messages.asada-not-selected',
  'Tenant not selected': 'api.error-messages.tenant-not-selected',
  Forbidden: 'api.error-messages.forbidden',
  Unauthorized: 'auth.invalid-credentials',
  'JWT verification failed: jwt expired': 'auth.token-expired',
  'There is already a measurement for this PodConnectorId in the current month.':
    'readings.alerts.duplicate-reading-error',
  'MeasuredAt cannot be in the future.':
    'api.error-messages.measured-at-future',
  // External API ErrorMessages enum mappings
  'You are not authorized to access this resource.':
    'api.error-messages.unauthorized',
  'You do not have permission to perform this action.':
    'api.error-messages.forbidden',
  'The requested resource was not found.': 'api.error-messages.not-found',
  'One or more validation errors occurred.':
    'api.error-messages.validation-error',
  'Validation Error': 'api.error-messages.validation-error',
  'The request was well-formed but contains semantic errors.':
    'api.error-messages.unprocessable',
  'An unexpected error has occurred.': 'api.error-messages.internal-error',
  'A database error occurred while processing your request.':
    'api.error-messages.database-error',
  'The request timed out. Please try again later.':
    'api.error-messages.timeout',
  'Too many requests': 'api.error-messages.too-many-requests',
  'Too Many Requests': 'api.error-messages.too-many-requests',
  'Unable to establish connection. Please try again later.':
    'api.error-messages.connection-error',
  'An error occurred while communicating with an external service.':
    'api.error-messages.external-service-error',
  'The requested object is invalid or no longer exists.':
    'api.error-messages.invalid-object',
  'A transaction error occurred. The operation was not completed.':
    'api.error-messages.transaction-error',

  // Local validation error mappings (from validation-errors.ts constants)
  'Resource not found': 'api.error-messages.not-found',
  'Invalid parameter': 'api.error-messages.validation-error',
  'Parameter is required': 'api.error-messages.validation-error',
  'Delete operation failed': 'api.error-messages.internal-error',

  'Cannot close corrective action without successful verification.':
    'operational.corrective-actions.close-needs-verification',
  'Cannot resolve operational alert while a linked corrective action is still open. Close the corrective action first (with resolveLinkedAlert) or cancel it.':
    'operational.alerts.resolve-blocked-open-corrective-action',
  'verificationReferenceType must be one of the following values: Pod.ChlorineReadings, Pod.FlowReadings, Pod.MonthlyWaterProduction':
    'operational.corrective-actions.verification-invalid-reference-type',
  'tenant.limits.forbidden': 'tenant.limits.forbidden',
  'tenant.limits.reached': 'tenant.limits.reached',
  'tenant.limits.access-denied': 'tenant.limits.access-denied',
  'asada.permission.forbidden': 'api.error-messages.forbidden',

  'Invalid SectorId or sector does not belong to ASADA.':
    'connections.bulk.errors.invalid-sector',
  'UserId/AuthUserId does not have effective access to this ASADA.':
    'connections.bulk.errors.no-effective-access',

  'payroll.exports.sicere.settings-required':
    'payroll.exports.sicere.settings-required',

  'asadaId is required for ASADA permission check':
    'hydric.errors.asada-required',
  'Period end must be after period start.': 'hydric.errors.invalid-period',
  'Water system not found.': 'hydric.errors.system-not-found',
  'A water system with this code already exists for the ASADA.':
    'hydric.errors.system-code-exists',
  'Water source not found.': 'hydric.errors.source-not-found',
  'A water source with this name already exists for the ASADA.':
    'hydric.errors.source-name-exists',
  'At least one gauging sample is required.':
    'hydric.errors.gauging-sample-required',
  'TimeSeconds must be greater than 0.': 'hydric.errors.time-positive',
  'ContainerVolumeLiters must be greater than 0.':
    'hydric.errors.volume-positive',
  'Measurement not found.': 'hydric.errors.measurement-not-found',
  'A macro meter with this code already exists for the ASADA.':
    'hydric.errors.macro-meter-code-exists',
  'Macro meter not found.': 'hydric.errors.macro-meter-not-found',
  'Macrometer reading cannot decrease without RESET, ROLLOVER, REPLACEMENT or CORRECTION.':
    'hydric.errors.reading-decrease',
  'Client must not send calculated flowLps.':
    'hydric.errors.client-flow-forbidden',
  'waterSystemId must be a UUID': 'hydric.errors.system-id-uuid',

  'Insufficient vacation days balance.':
    'payroll.employees.detail.vacations.errors.insufficient-balance',
  'Vacation days must be greater than zero.':
    'payroll.employees.detail.vacations.errors.zero-days',
  'StartDate must be on or before EndDate.':
    'payroll.employees.detail.vacations.errors.date-order',
  'StartDate must be in the future.':
    'payroll.employees.detail.vacations.errors.start-date-must-be-future',
  'Vacation registration applies to EMPLOYEE profiles only.':
    'payroll.employees.detail.vacations.errors.not-employee-profile',
  'Vacation entry not found for this employee.':
    'payroll.employees.detail.vacations.errors.entry-not-found',
  'Cannot modify a vacation period that has already started.':
    'payroll.employees.detail.vacations.errors.already-started-edit',
  'Cannot delete a vacation period that has already started.':
    'payroll.employees.detail.vacations.errors.already-started-delete',
  'Employee profile not found for this ASADA.':
    'payroll.employees.detail.vacations.errors.employee-not-found',

  'El mensaje no puede contener el carácter "$" (no es compatible con el proveedor de SMS).':
    'messaging.errors.dollar-not-allowed'
}

export const isKnownError = (error: string) => {
  return (
    error in ERROR_MESSAGES || Object.values(ERROR_MESSAGES).includes(error)
  )
}

export const isErrorI18nKey = (error: string) =>
  Object.values(ERROR_MESSAGES).includes(error)

const isSafeDefaultErrorKey = (key: string): boolean =>
  isKnownError(key) ||
  key.startsWith('api.') ||
  key.startsWith('auth.') ||
  /^[a-z][a-z0-9-]*(\.[a-z][a-z0-9-]*)+$/i.test(key)

const isLinkedOpenCorrectiveActionError = (error: string): boolean =>
  /cannot resolve operational alert while a linked corrective action is still open/i.test(
    error
  )

const resolveHydricPrefixedError = (error: string): string | null => {
  if (/^Unknown or inactive waterSourceTypeCode:/i.test(error)) {
    return 'hydric.errors.unknown-source-type'
  }
  if (/^Duplicate sampleNumber:/i.test(error)) {
    return 'hydric.errors.duplicate-sample'
  }
  return null
}

const isPreviousBillingCycleReversalError = (error: string): boolean =>
  /cannot reverse a payment applied to an invoice from a previous billing cycle/i.test(
    error
  )

const getErrorMessage = (error: string, defaultMessage?: string) => {
  if (isLinkedOpenCorrectiveActionError(error)) {
    return 'operational.alerts.resolve-blocked-open-corrective-action'
  }

  const hydricPrefixed = resolveHydricPrefixedError(error)
  if (hydricPrefixed) return hydricPrefixed

  if (isPreviousBillingCycleReversalError(error)) {
    return 'payments.payment-detail.reverse-error-previous-cycle'
  }

  if (error in ERROR_MESSAGES) {
    return ERROR_MESSAGES[error as keyof typeof ERROR_MESSAGES]
  }

  if (defaultMessage && isSafeDefaultErrorKey(defaultMessage)) {
    return defaultMessage
  }

  return 'api.error-messages.generic'
}

export default getErrorMessage
