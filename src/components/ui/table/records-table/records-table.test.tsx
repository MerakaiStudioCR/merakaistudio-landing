import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import RecordsTable from './index'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/'
}))

describe('RecordsTable', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders a read-only table without the listing actions slot', () => {
    render(
      <RecordsTable
        columns={[
          { key: 'asada', header: 'ASADA' },
          { key: 'status', header: 'Estado' }
        ]}
        records={[{ asada: 'La Bomba', status: 'Activo' }]}
      />
    )

    expect(screen.getByText('ASADA')).toBeTruthy()
    expect(screen.getByText('La Bomba')).toBeTruthy()
    expect(screen.getByText('Estado')).toBeTruthy()
    expect(document.querySelector('[data-slot="records-table"]')).toBeTruthy()
    expect(document.querySelector('[data-slot="table"]')).toBeNull()
  })

  it('shows the empty message when there are no rows', () => {
    render(
      <RecordsTable
        columns={[{ key: 'asada', header: 'ASADA' }]}
        records={[]}
        emptyMessage='Sin datos'
      />
    )

    expect(screen.getByText('Sin datos')).toBeTruthy()
    expect(document.querySelector('[data-slot="records-table"]')).toBeNull()
  })
})
