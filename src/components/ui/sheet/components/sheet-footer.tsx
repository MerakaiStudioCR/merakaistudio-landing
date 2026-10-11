import { cn } from '~/shared/lib/cn'

const SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='sheet-footer'
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

export default SheetFooter
