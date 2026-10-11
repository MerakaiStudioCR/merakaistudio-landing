import { describe, expect, it } from 'vitest'
import es from '~/i18n/messages/es.json'
import {
  resolveRoleMessageKey,
  translateRoleName,
  translateRoleNames,
  translateRolesLabel
} from './translate-role'

const t = (key: string): string => {
  const value = key.split('.').reduce<unknown>((current, part) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[part]
  }, es)

  return typeof value === 'string' ? value : key
}

describe('translate-role', () => {
  it('maps tenant and platform role codes to message keys', () => {
    expect(resolveRoleMessageKey('TenantOwner')).toBe('roles.tenant-owner')
    expect(resolveRoleMessageKey('tenant_admin')).toBe('roles.tenant-admin')
    expect(resolveRoleMessageKey('PlatformSuperAdmin')).toBe(
      'roles.platform-super-admin'
    )
    expect(resolveRoleMessageKey('UnknownRole')).toBeNull()
  })

  it('translates API role codes to Spanish labels', () => {
    expect(translateRoleName(t, 'TenantOwner')).toBe('Propietario')
    expect(translateRoleName(t, 'TenantAdmin')).toBe(
      'Administrador de la organización'
    )
    expect(translateRoleName(t, 'ASADA_ADMIN')).toBe('Administrador')
    expect(translateRoleName(t, 'Administrador ASADA')).toBe('Administrador')
    expect(translateRoleName(t, 'METER_READER')).toBe('Lecturista')
    expect(translateRoleName(t, 'PAYROLL_CLERK')).toBe('Responsable planilla')
    expect(translateRoleName(t, 'INCIDENT_TECHNICIAN')).toBe(
      'Técnico de incidentes'
    )
  })

  it('prefers a mapped code over an unmapped display name', () => {
    expect(translateRoleName(t, 'OPERATOR', 'Field Staff')).toBe('Operador')
  })

  it('keeps unknown role names unchanged', () => {
    expect(translateRoleName(t, 'CustomRole')).toBe('CustomRole')
    expect(translateRoleName(t, '  ')).toBe('')
  })

  it('falls back to the human-readable name, not the raw code, for unmapped roles', () => {
    expect(
      translateRoleName(t, 'CALENDAR_COORDINATOR', 'Coordinador calendario')
    ).toBe('Coordinador calendario')
    expect(translateRoleName(t, 'PAYROLL_CLERK', 'Responsable planilla')).toBe(
      'Responsable planilla'
    )
  })

  it('joins and translates comma-separated role labels', () => {
    expect(translateRoleNames(t, ['TenantOwner', 'TenantAdmin'])).toBe(
      'Propietario, Administrador de la organización'
    )
    expect(translateRolesLabel(t, 'TenantOwner, Gestor Asada')).toBe(
      'Propietario, Gestor de ASADA'
    )
    expect(translateRolesLabel(t, '-')).toBe('-')
  })
})
