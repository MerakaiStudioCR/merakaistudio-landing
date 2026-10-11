import * as SheetPrimitive from '@radix-ui/react-dialog'
import SheetTrigger from './components/sheet-trigger'
import SheetClose from './components/sheet-close'
import SheetPortal from './components/sheet-portal'
import SheetOverlay from './components/sheet-overlay'
import SheetContent from './components/sheet-content'
import SheetHeader from './components/sheet-header'
import SheetFooter from './components/sheet-footer'
import SheetTitle from './components/sheet-title'
import SheetDescription from './components/sheet-description'
import SheetCloseButton from './components/sheet-close-button'

const Sheet = ({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) => {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />
}

// Create compound components
Sheet.Trigger = SheetTrigger
Sheet.Close = SheetClose
Sheet.Portal = SheetPortal
Sheet.Overlay = SheetOverlay
Sheet.Content = SheetContent
Sheet.Header = SheetHeader
Sheet.Footer = SheetFooter
Sheet.Title = SheetTitle
Sheet.Description = SheetDescription
Sheet.CloseButton = SheetCloseButton

export default Sheet
