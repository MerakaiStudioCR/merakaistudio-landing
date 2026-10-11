'use client'

import { useRouter } from 'next/navigation'
import DeleteDialog, {
  type DeleteItem
} from '~/shared/components/delete-dialog'
import type { MessageKey } from '~/i18n/types'
import type { UseMutationResult } from '@tanstack/react-query'

type Props<T extends DeleteItem> = {
  item: T
  mutation: UseMutationResult<unknown, Error, string>
  open: boolean
  onOpenChange: (open: boolean) => void
  redirectTo?: string
  titleKey?: MessageKey
  descriptionKey?: MessageKey
  getItemName?: (item: T) => string
  getMutationId?: (item: T) => string
}

const DeleteEntityModal = <T extends DeleteItem>({
  item,
  mutation,
  open,
  onOpenChange,
  redirectTo,
  titleKey,
  descriptionKey,
  getItemName,
  getMutationId
}: Props<T>) => {
  const router = useRouter()

  const handleConfirm = () => {
    const mutationId = getMutationId ? getMutationId(item) : String(item.id)
    mutation.mutate(mutationId, {
      onSuccess: () => {
        onOpenChange(false)
        if (redirectTo) router.push(redirectTo)
      }
    })
  }

  return (
    <DeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      item={item}
      titleKey={titleKey}
      descriptionKey={descriptionKey}
      getItemName={getItemName}
      actions={
        <DeleteDialog.Actions
          onCancel={() => onOpenChange(false)}
          onConfirm={handleConfirm}
          isDeleting={mutation.isPending}
        />
      }
    />
  )
}

export default DeleteEntityModal
