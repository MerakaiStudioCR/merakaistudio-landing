'use client'

import Button from '~/components/ui/button'
import Dialog from '~/components/ui/dialog'
import Loader from '~/components/ui/loader'
import useMessages from '~/i18n/useMessages'
import type { MessageKey } from '~/i18n/types'

export type DeleteItem = {
  id: string | number
  name?: string
  [key: string]: unknown
}

type DeleteDialogProps<T extends DeleteItem> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: T | null
  titleKey?: MessageKey
  descriptionKey?: MessageKey
  getItemName?: (item: T) => string
  actions: React.ReactNode
}

type ActionsProps = {
  onCancel: () => void
  onConfirm: () => void
  isDeleting: boolean
  confirmText?: string
}

const Actions = ({
  onCancel: _onCancel,
  onConfirm,
  isDeleting,
  confirmText
}: ActionsProps) => {
  const t = useMessages()

  return (
    <Dialog.Footer>
      <Dialog.Cancel asChild>
        <Button variant='secondary' disabled={isDeleting}>
          {t('global.cancel')}
        </Button>
      </Dialog.Cancel>
      <Dialog.Action asChild>
        <Button variant='destructive' disabled={isDeleting} onClick={onConfirm}>
          {isDeleting ? (
            <Loader className='mx-6 *:text-light-foreground' />
          ) : (
            confirmText || t('global.delete')
          )}
        </Button>
      </Dialog.Action>
    </Dialog.Footer>
  )
}
/**
 * Reusable delete confirmation dialog component.
 * Works with any entity type that has an id and optional name.
 * Props are designed to match useDeleteDialog hook return values for easy spreading.
 */
const DeleteDialog = <T extends DeleteItem>({
  open,
  onOpenChange,
  item,
  titleKey = 'global.delete-title',
  descriptionKey = 'global.delete-description',
  getItemName,
  actions
}: DeleteDialogProps<T>) => {
  const t = useMessages()

  const itemName =
    item && getItemName ? getItemName(item) : item?.name || item?.id || ''

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Panel
        size='sm'
        title={t(titleKey, { name: itemName })}
        description={t(descriptionKey, { name: itemName })}
        footer={actions}
      />
    </Dialog>
  )
}

DeleteDialog.Actions = Actions

export default DeleteDialog
