import { cn } from '~/shared/lib/cn'
import withColumnVisibility from '../hocs/withColumnVisibility'
import actionsColumnClass from '../lib/actions-column-class'

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  tableClassName?: string
}

const TableCell = ({
  children,
  className,
  tableClassName,
  ...props
}: Props) => {
  const isActionsColumn = className?.includes('table-actions')

  return (
    <td
      className={cn(
        'border-border/60 border-r-0 border-b px-4 py-4 last:border-r-0',
        isActionsColumn && actionsColumnClass,
        tableClassName
      )}
      {...props}
    >
      <div className={cn('whitespace-nowrap', className)}>{children}</div>
    </td>
  )
}

export default withColumnVisibility(TableCell)
