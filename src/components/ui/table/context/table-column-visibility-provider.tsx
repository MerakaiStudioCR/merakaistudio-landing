import { useState, useCallback, type ReactNode, useMemo } from 'react'
import { TableColumnVisibilityContext } from './table-column-visibility-context'

export interface ColumnConfig {
  id: string
  label: string
  visible: boolean
  hidden: boolean
}

export interface TableColumnVisibilityContextType {
  columns: ColumnConfig[]
  registerColumn: (id: string, label: string, hidden?: boolean) => void
  toggleColumn: (id: string) => void
  resetToDefaults: () => void
  isColumnVisible: (id: string) => boolean
  hasHiddenColumns: boolean
}

interface ProviderProps {
  children: ReactNode
}

export const TableColumnVisibilityProvider = ({ children }: ProviderProps) => {
  const [columns, setColumns] = useState<ColumnConfig[]>([])

  const registerColumn = useCallback(
    (id: string, label: string, hidden = false) => {
      setColumns((prev) => {
        // Check if column already exists
        if (prev.some((col) => col.id === id)) {
          return prev
        }
        // Create new array with new column
        return [...prev, { id, label, visible: !hidden, hidden }]
      })
    },
    []
  )

  const toggleColumn = useCallback((id: string) => {
    setColumns((prev) => {
      // Find the column to toggle
      const columnToToggle = prev.find((col) => col.id === id)
      if (!columnToToggle) {
        return prev // Return same reference if column not found
      }

      // Create new array with toggled column
      return prev.map((col) => {
        if (col.id === id) {
          return { ...col, visible: !col.visible }
        }
        // Keep same reference for unchanged columns
        return col
      })
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setColumns((prev) => {
      // Check if any columns need to be reset
      const needsReset = prev.some((col) => col.visible !== !col.hidden)
      if (!needsReset) {
        return prev // Return same reference if no changes needed
      }

      // Create new array with reset columns
      return prev.map((col) => {
        if (col.visible !== !col.hidden) {
          return { ...col, visible: !col.hidden }
        }
        return col
      })
    })
  }, [])

  const isColumnVisible = useCallback(
    (id: string) => {
      const column = columns.find((col) => col.id === id)
      return column?.visible ?? true
    },
    [columns]
  )

  const hasHiddenColumns = useMemo(() => {
    return columns.some((col) => col.hidden)
  }, [columns])

  const value: TableColumnVisibilityContextType = {
    columns,
    registerColumn,
    toggleColumn,
    resetToDefaults,
    isColumnVisible,
    hasHiddenColumns
  }

  return (
    <TableColumnVisibilityContext.Provider value={value}>
      {children}
    </TableColumnVisibilityContext.Provider>
  )
}
