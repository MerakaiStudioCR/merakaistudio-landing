import * as SheetPrimitive from '@radix-ui/react-dialog'

import { cn } from '~/shared/lib/cn'
import SheetPortal from './sheet-portal'
import SheetOverlay from './sheet-overlay'
import SheetCloseButton from './sheet-close-button'

const SheetContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={cn(
          'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
          className
        )}
        {...props}
      >
        {children}
        <SheetCloseButton />
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

export default SheetContent
