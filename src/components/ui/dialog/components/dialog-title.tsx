import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '~/shared/lib/cn'

const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => {
  return (
    <AlertDialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn('font-semibold text-2xl', className)}
      {...props}
    />
  )
}

export default DialogTitle
