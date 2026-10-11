import { useContext } from 'react'
import { TableColumnVisibilityContext } from '../context/table-column-visibility-context'

const useTableColumnVisibility = () => {
  const context = useContext(TableColumnVisibilityContext)
  if (!context) {
    throw new Error(
      'useTableColumnVisibility must be used within a TableColumnVisibilityProvider'
    )
  }
  return context
}

export default useTableColumnVisibility
