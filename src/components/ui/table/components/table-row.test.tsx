import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import TableRow from './table-row'

const { push } = vi.hoisted(() => ({ push: vi.fn() }))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/finance/invoicing'
}))

const renderRow = (child: React.ReactNode) =>
  render(
    <table>
      <tbody>
        <TableRow href='/finance/invoicing/invoices/1'>
          <td>{child}</td>
        </TableRow>
      </tbody>
    </table>
  )

describe('TableRow', () => {
  afterEach(() => {
    cleanup()
    push.mockClear()
  })

  it('navigates when the row is clicked', () => {
    renderRow('Invoice 1')

    fireEvent.click(screen.getByText('Invoice 1'))

    expect(push).toHaveBeenCalledWith('/finance/invoicing/invoices/1')
  })

  it('does not navigate when an inner button is clicked', () => {
    renderRow(<button type='button'>Open customer</button>)

    fireEvent.click(screen.getByRole('button', { name: 'Open customer' }))

    expect(push).not.toHaveBeenCalled()
  })

  it('navigates when Enter is pressed on the row', () => {
    renderRow('Invoice 1')

    fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter' })

    expect(push).toHaveBeenCalledWith('/finance/invoicing/invoices/1')
  })
})
