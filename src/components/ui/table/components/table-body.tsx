import { cn } from '~/shared/lib/cn'

type Props = React.HTMLAttributes<HTMLTableSectionElement> & {
  children: React.ReactNode
}

const TableBody = ({ children, className, ...props }: Props) => {
  return (
    <tbody className={cn('bg-background', className)} {...props}>
      {children}
    </tbody>
  )
}

export default TableBody
