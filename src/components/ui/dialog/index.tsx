import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import DialogTrigger from './components/dialog-trigger'
import DialogPortal from './components/dialog-portal'
import DialogOverlay from './components/dialog-overlay'
import DialogContent from './components/dialog-content'
import DialogHeader from './components/dialog-header'
import DialogFooter from './components/dialog-footer'
import DialogTitle from './components/dialog-title'
import DialogDescription from './components/dialog-description'
import DialogAction from './components/dialog-action'
import DialogCancel from './components/dialog-cancel'
import DialogPanel from './components/dialog-panel'
import DialogCloseButton from './components/dialog-close-button'

const Dialog = ({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => {
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />
}

// Create compound components
Dialog.Trigger = DialogTrigger
Dialog.Portal = DialogPortal
Dialog.Overlay = DialogOverlay
Dialog.Content = DialogContent
Dialog.Panel = DialogPanel
Dialog.CloseButton = DialogCloseButton
Dialog.Header = DialogHeader
Dialog.Footer = DialogFooter
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription
Dialog.Action = DialogAction
Dialog.Cancel = DialogCancel

export default Dialog
