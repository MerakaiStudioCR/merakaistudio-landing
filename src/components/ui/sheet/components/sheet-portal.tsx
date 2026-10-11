import * as SheetPrimitive from '@radix-ui/react-dialog'

const SheetPortal = ({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) => {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
}

export default SheetPortal
