import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '~/shared/lib/cn'
import DialogPortal from './dialog-portal'
import DialogOverlay from './dialog-overlay'

const DialogContent = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
          className
        )}
        {...props}
      />
    </DialogPortal>
  )
}

export default DialogContent
