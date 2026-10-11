import { cn } from '~/shared/lib/cn'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const TableContainer = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'w-full max-w-full overflow-x-auto overscroll-x-contain rounded-xl border border-border bg-light-background shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default TableContainer
