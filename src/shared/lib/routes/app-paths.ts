/** Base paths for the authenticated application (no /admin prefix). */
export const APP_PATHS = {
  bootstrap: '/bootstrap',
  dashboard: '/dashboard',
  selectTenant: '/select-tenant',
  selectAsada: '/select-asada',
  forbidden: '/forbidden',
  changePassword: '/change-password',
  settings: '/settings',
  connections: '/connections',
  customers: '/customers',
  messaging: '/messaging',
  messagingNotices: '/messaging/historial',
  messagingTemplates: '/messaging/plantillas',
  messagingTemplateNew: '/messaging/plantillas/nueva',
  incidents: '/incidentes',
  incidentsNew: '/incidentes/nuevo',
  incidentsTemplates: '/incidentes/plantillas',
  incidentsTemplateNew: '/incidentes/plantillas/nueva',
  readings: '/readings',
  sectors: '/sectors',
  pods: '/pods',
  tanks: '/tanks',
  inventory: '/inventory',
  finance: {
    invoicing: '/finance/invoicing',
    payments: '/finance/payments',
    corrections: '/finance/corrections',
    arrangements: '/finance/arrangements',
    statistics: '/finance/statistics',
    collectionReports: '/finance/collection-reports',
    billingCycle: '/finance/billing-cycle'
  },
  payroll: {
    root: '/payroll',
    settings: '/payroll/settings',
    employees: '/payroll/employees',
    payPeriods: '/payroll/pay-periods',
    payslips: '/payroll/payslips',
    myPayslips: '/payroll/payslips/me',
    reports: '/payroll/reports',
    auditLog: '/payroll/audit-log',
    aguinaldo: '/payroll/aguinaldo'
  },
  accounting: {
    mappings: '/accounting/mappings',
    journalEntries: '/accounting/journal-entries',
    reports: '/accounting/reports'
  },
  calendar: '/calendar',
  quality: '/quality',
  hydric: '/hydric'
} as const

export const messagingTemplateEditPath = (
  templateId: string,
  channel: string
) =>
  `${APP_PATHS.messagingTemplates}/${encodeURIComponent(templateId)}/editar?channel=${encodeURIComponent(channel)}`

export const incidentPath = (incidentId: string) =>
  `${APP_PATHS.incidents}/${encodeURIComponent(incidentId)}`

export const connectionPath = (id: string) => `${APP_PATHS.connections}/${id}`

export const invoicingByConnectorPath = (connectorId: number) =>
  `${APP_PATHS.finance.invoicing}?connectorId=${encodeURIComponent(String(connectorId))}`

export const customerPath = (id: string) => `${APP_PATHS.customers}/${id}`

export const invoicePath = (id: string) =>
  `${APP_PATHS.finance.invoicing}/invoices/${id}`

export const paymentPath = (id: string) => `${APP_PATHS.finance.payments}/${id}`

export const newPaymentPath = ({
  connectionId,
  invoiceId,
  podConnectorId
}: {
  connectionId?: number | null
  invoiceId?: string
  podConnectorId?: string | null
} = {}) => {
  const params = new URLSearchParams()
  if (
    connectionId != null &&
    Number.isInteger(connectionId) &&
    connectionId >= 1
  ) {
    params.set('connectionId', String(connectionId))
  }
  if (invoiceId) params.set('invoiceId', invoiceId)
  const connectorId = podConnectorId?.trim()
  if (connectorId) params.set('podConnectorId', connectorId)
  const query = params.toString()
  return query
    ? `${APP_PATHS.finance.payments}/new?${query}`
    : `${APP_PATHS.finance.payments}/new`
}

export const payrollEmployeePath = (id: string) =>
  `${APP_PATHS.payroll.employees}/${id}`

export const payrollPayPeriodPath = (id: string) =>
  `${APP_PATHS.payroll.payPeriods}/${id}`

export const payrollPayslipPath = (id: string) =>
  `${APP_PATHS.payroll.payslips}/${id}`

export const accountingJournalEntryPath = (id: string) =>
  `${APP_PATHS.accounting.journalEntries}/${id}`

export const correctiveActionPath = (id: string) =>
  `/operational/corrective-actions/${encodeURIComponent(id)}`

export const operationalAlertPath = (id: string) =>
  `/operational/alerts/${encodeURIComponent(id)}`

/** Legacy prefix kept only for redirects in next.config. */
export const LEGACY_ADMIN_PREFIX = '/admin'

const PERMISSION_GUARD_SKIP_PREFIXES = [
  '/bootstrap',
  '/select-tenant',
  '/select-asada',
  '/forbidden',
  '/auth',
  '/admin'
] as const

export function isPermissionGuardedRoute(
  pathname: string | null | undefined
): boolean {
  if (!pathname || pathname === '/') return false
  if (pathname.startsWith('/auth')) return false
  return !PERMISSION_GUARD_SKIP_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )
}
