/**
 * Standard table for the entire app. Use `<Table>` with its subcomponents only;
 * do not wrap tables in custom borders/scroll containers or use raw `<table>`.
 *
 * @example
 * <Table>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.Header>Name</Table.Header>
 *       <Table.ActionsHeader />
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>...</Table.Body>
 * </Table>
 */
import { cn } from '~/shared/lib/cn'
import { TableColumnVisibilityProvider } from './context/table-column-visibility-provider'
import ColumnVisibilitySelect from './components/column-visibility-select'
import TableContainer from './components/table-container'
import TableHead from './components/table-head'
import TableBody from './components/table-body'
import TableRow from './components/table-row'
import TableHeader from './components/table-header'
import TableActionsHeader from './components/table-actions-header'
import TableSortableHeader from './components/table-sortable-header'
import TableCell from './components/table-cell'
import SelectionHeader from './components/selection-header'
import SelectionCell from './components/selection-cell'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
  showColumnControls?: boolean
  /**
   * `listing` keeps the sticky last column used by action menus.
   * `records` is for read-only dumps without an actions button.
   */
  variant?: 'listing' | 'records'
}

const Table = ({
  children,
  className,
  showColumnControls = false,
  variant = 'listing',
  ...props
}: TableProps) => {
  return (
    <TableColumnVisibilityProvider>
      {showColumnControls && (
        <div className='mb-2 flex justify-end'>
          <ColumnVisibilitySelect />
        </div>
      )}
      <TableContainer>
        <table
          className={cn(
            'w-max min-w-full border-separate border-spacing-0',
            className
          )}
          data-slot={variant === 'records' ? 'records-table' : 'table'}
          {...props}
        >
          {children}
        </table>
      </TableContainer>
    </TableColumnVisibilityProvider>
  )
}

Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Header = TableHeader
Table.ActionsHeader = TableActionsHeader
Table.SortableHeader = TableSortableHeader
Table.Cell = TableCell
Table.SelectionHeader = SelectionHeader
Table.SelectionCell = SelectionCell

export default Table
