import { describe, expect, it } from 'vitest'
import { isInteractiveTableRowTarget } from './is-interactive-table-row-target'

describe('isInteractiveTableRowTarget', () => {
  it('returns false for a plain table cell', () => {
    const cell = document.createElement('td')
    cell.textContent = 'Invoice 1'
    document.body.append(cell)

    expect(isInteractiveTableRowTarget(cell)).toBe(false)
    cell.remove()
  })

  it('returns true for a button and its descendants', () => {
    const button = document.createElement('button')
    const label = document.createElement('span')
    label.textContent = 'Open customer'
    button.append(label)
    document.body.append(button)

    expect(isInteractiveTableRowTarget(button)).toBe(true)
    expect(isInteractiveTableRowTarget(label)).toBe(true)
    button.remove()
  })
})
