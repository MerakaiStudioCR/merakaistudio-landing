import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import Button from '~/components/ui/button'

const DialogTrigger = ({
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger> &
  React.ComponentProps<typeof Button>) => {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot='alert-dialog-trigger'
      asChild
      {...props}
    >
      {asChild ? children : <Button>{children}</Button>}
    </AlertDialogPrimitive.Trigger>
  )
}

export default DialogTrigger
