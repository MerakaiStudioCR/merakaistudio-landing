import { useEffect } from 'react'
import useTableColumnVisibility from '../hooks/useTableColumnVisibility'

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode
  columnId?: string
  hidden?: boolean
  tableClassName?: string
}

const withColumnVisibility = (CellComponent: React.ComponentType<Props>) => {
  return ({ children, columnId, hidden, tableClassName, ...props }: Props) => {
    const { registerColumn, isColumnVisible } = useTableColumnVisibility()

    useEffect(() => {
      if (columnId && typeof children === 'string') {
        registerColumn(columnId, children, hidden)
      }
    }, [columnId, children, hidden, registerColumn])

    const isVisible = columnId ? isColumnVisible(columnId) : true

    if (!isVisible) {
      return null
    }

    return (
      <CellComponent tableClassName={tableClassName} {...props}>
        {children}
      </CellComponent>
    )
  }
}

export default withColumnVisibility
