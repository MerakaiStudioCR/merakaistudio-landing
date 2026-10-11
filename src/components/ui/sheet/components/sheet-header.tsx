import { cn } from '~/shared/lib/cn'

const SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='sheet-header'
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

export default SheetHeader
