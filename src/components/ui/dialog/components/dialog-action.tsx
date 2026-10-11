import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import Button from '~/components/ui/button'

const DialogAction = ({
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  React.ComponentProps<typeof Button>) => {
  return (
    <AlertDialogPrimitive.Action
      data-slot='alert-dialog-action'
      asChild
      {...props}
    >
      {asChild ? children : <Button>{children}</Button>}
    </AlertDialogPrimitive.Action>
  )
}

export default DialogAction
