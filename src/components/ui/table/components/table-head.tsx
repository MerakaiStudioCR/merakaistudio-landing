import { cn } from '~/shared/lib/cn'

type Props = React.HTMLAttributes<HTMLTableSectionElement> & {
  children: React.ReactNode
}

const TableHead = ({ children, className, ...props }: Props) => {
  return (
    <thead className={cn('bg-background', className)} {...props}>
      {children}
    </thead>
  )
}

export default TableHead
