import { translateMessageKey } from '~/i18n/translate-message-key'

type RoleTranslator = Parameters<typeof translateMessageKey>[0]

const ROLE_MESSAGE_KEYS: Record<string, string> = {
  tenantowner: 'roles.tenant-owner',
  owner: 'roles.tenant-owner',
  tenantadmin: 'roles.tenant-admin',
  tenantviewer: 'roles.tenant-viewer',
  tenantuser: 'roles.tenant-user',
  platformadmin: 'roles.platform-admin',
  platformsuperadmin: 'roles.platform-super-admin',
  superadmin: 'roles.platform-super-admin',
  asadaadmin: 'roles.asada-admin',
  administradorasada: 'roles.asada-admin',
  administrador: 'roles.asada-admin',
  gestorasada: 'roles.asada-manager',
  gestor: 'roles.asada-manager',
  operator: 'roles.operator',
  operador: 'roles.operator',
  meterreader: 'roles.meter-reader',
  lector: 'roles.meter-reader',
  lecturista: 'roles.meter-reader',
  billingclerk: 'roles.billing-clerk',
  facturador: 'roles.billing-clerk',
  payrollclerk: 'roles.payroll-clerk',
  responsableplanilla: 'roles.payroll-clerk',
  accountant: 'roles.accountant',
  contador: 'roles.accountant',
  incidenttechnician: 'roles.incident-technician',
  tecnicodeincidentes: 'roles.incident-technician',
  auditor: 'roles.auditor',
  viewer: 'roles.viewer',
  sololelectura: 'roles.viewer',
  client: 'roles.client',
  cliente: 'roles.client',
  customer: 'roles.client'
}

export function normalizeRoleDisplayKey(role: string): string {
  return role
    .trim()
    .replace(/[\s_-]+/g, '')
    .toLowerCase()
}

export function resolveRoleMessageKey(
  role: string | null | undefined
): string | null {
  const normalized = role ? normalizeRoleDisplayKey(role) : ''
  if (!normalized) return null

  return ROLE_MESSAGE_KEYS[normalized] ?? null
}

export function translateRoleName(
  t: RoleTranslator,
  ...candidates: Array<string | null | undefined>
): string {
  const values = candidates.map((value) => value?.trim() ?? '').filter(Boolean)

  for (const value of values) {
    const messageKey = resolveRoleMessageKey(value)
    if (messageKey) return translateMessageKey(t, messageKey)
  }

  // No static translation matched (e.g. a newer role code like
  // CALENDAR_COORDINATOR). Callers pass the raw code first and an
  // already human-readable name/label last (see useTeamMemberRoleOptions) —
  // prefer that over falling back to the raw code.
  return values.at(-1) ?? ''
}

export function translateRoleNames(
  t: RoleTranslator,
  names: Array<string | null | undefined>
): string {
  return names
    .map((name) => translateRoleName(t, name))
    .filter(Boolean)
    .join(', ')
}

export function translateRolesLabel(
  t: RoleTranslator,
  label: string | null | undefined
): string {
  const trimmed = label?.trim() ?? ''
  if (!trimmed || trimmed === '-') return trimmed || '-'

  return trimmed
    .split(/\s*,\s*/)
    .map((part) => translateRoleName(t, part))
    .join(', ')
}
