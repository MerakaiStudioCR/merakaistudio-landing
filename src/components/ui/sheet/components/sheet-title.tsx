import * as SheetPrimitive from '@radix-ui/react-dialog'

import { cn } from '~/shared/lib/cn'

const SheetTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) => {
  return (
    <SheetPrimitive.Title
      data-slot='sheet-title'
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  )
}

export default SheetTitle
