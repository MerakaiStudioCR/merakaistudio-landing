import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import Button from '~/components/ui/button'

const DialogCancel = ({
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  React.ComponentProps<typeof Button>) => {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot='alert-dialog-cancel'
      asChild
      {...props}
    >
      {asChild ? children : <Button variant='secondary'>{children}</Button>}
    </AlertDialogPrimitive.Cancel>
  )
}

export default DialogCancel
