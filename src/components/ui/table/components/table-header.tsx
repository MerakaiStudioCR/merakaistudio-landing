import { cn } from '~/shared/lib/cn'
import withColumnVisibility from '../hocs/withColumnVisibility'

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
  tableClassName?: string
}

const TableHeader = ({
  children,
  className,
  tableClassName: _tableClassName,
  ...props
}: Props) => {
  return (
    <th
      className={cn(
        'border-border border-r-0 border-b bg-transparent px-4 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide last:border-r-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export default withColumnVisibility(TableHeader)
