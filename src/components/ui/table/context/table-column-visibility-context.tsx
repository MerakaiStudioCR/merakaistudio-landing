import { createContext } from 'react'
import type { TableColumnVisibilityContextType } from './table-column-visibility-provider'

export const TableColumnVisibilityContext =
  createContext<TableColumnVisibilityContextType | null>(null)
