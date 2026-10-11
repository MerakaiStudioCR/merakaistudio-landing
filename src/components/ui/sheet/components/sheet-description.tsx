import * as SheetPrimitive from '@radix-ui/react-dialog'

import { cn } from '~/shared/lib/cn'

const SheetDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) => {
  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
}

export default SheetDescription
