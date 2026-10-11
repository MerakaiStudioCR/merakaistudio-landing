import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

const DialogPortal = ({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) => {
  return (
    <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
  )
}

export default DialogPortal
