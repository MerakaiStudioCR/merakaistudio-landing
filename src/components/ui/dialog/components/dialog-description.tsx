import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

const DialogDescription = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Description>
) => {
  return (
    <AlertDialogPrimitive.Description
      data-slot='alert-dialog-description'
      {...props}
    />
  )
}

export default DialogDescription
