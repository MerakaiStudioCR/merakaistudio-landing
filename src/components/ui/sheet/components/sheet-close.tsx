import * as SheetPrimitive from '@radix-ui/react-dialog'

const SheetClose = ({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) => {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />
}

export default SheetClose
