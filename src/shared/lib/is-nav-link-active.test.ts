import { describe, expect, it } from 'vitest'
import { isNavLinkActive } from './is-nav-link-active'

const payrollNavUrls = [
  '/payroll',
  '/payroll/settings',
  '/payroll/employees',
  '/payroll/pay-periods',
  '/payroll/payslips',
  '/payroll/payslips/me',
  '/payroll/aguinaldo',
  '/payroll/reports',
  '/payroll/audit-log'
]

describe('isNavLinkActive', () => {
  it('marks only payroll overview active on /payroll', () => {
    expect(
      isNavLinkActive({
        url: '/payroll',
        pathname: '/payroll',
        navUrls: payrollNavUrls
      })
    ).toBe(true)

    expect(
      isNavLinkActive({
        url: '/payroll/employees',
        pathname: '/payroll',
        navUrls: payrollNavUrls
      })
    ).toBe(false)
  })

  it('marks only employees active on nested employee routes', () => {
    expect(
      isNavLinkActive({
        url: '/payroll',
        pathname: '/payroll/employees',
        navUrls: payrollNavUrls
      })
    ).toBe(false)

    expect(
      isNavLinkActive({
        url: '/payroll/employees',
        pathname: '/payroll/employees/abc-123',
        navUrls: payrollNavUrls
      })
    ).toBe(true)
  })

  it('prefers the most specific payslip route', () => {
    expect(
      isNavLinkActive({
        url: '/payroll/payslips/me',
        pathname: '/payroll/payslips/me',
        navUrls: payrollNavUrls
      })
    ).toBe(true)

    expect(
      isNavLinkActive({
        url: '/payroll/payslips',
        pathname: '/payroll/payslips/me',
        navUrls: payrollNavUrls
      })
    ).toBe(false)

    expect(
      isNavLinkActive({
        url: '/payroll',
        pathname: '/payroll/payslips/me',
        navUrls: payrollNavUrls
      })
    ).toBe(false)
  })

  it('uses pending path exclusively while navigating', () => {
    expect(
      isNavLinkActive({
        url: '/payroll',
        pathname: '/payroll/employees',
        pendingPath: '/payroll',
        navUrls: payrollNavUrls
      })
    ).toBe(true)

    expect(
      isNavLinkActive({
        url: '/payroll/employees',
        pathname: '/payroll/employees',
        pendingPath: '/payroll',
        navUrls: payrollNavUrls
      })
    ).toBe(false)
  })
})
