'use client'

import ButtonActionItem from '~/components/layout/entity-actions/components/button-action-item'
import LinkActionItem from '~/components/layout/entity-actions/components/link-action-item'
import ModalActionItem from '~/components/layout/entity-actions/components/modal-action-item'
import type {
  EntityAction,
  ModalAction
} from '~/components/layout/entity-actions/types'

interface Props {
  action: EntityAction
  onClose: () => void
  onModalOpen: (action: ModalAction) => void
}

const TableRowActionItem = ({ action, onClose, onModalOpen }: Props) => {
  switch (action.type) {
    case 'link':
      return <LinkActionItem action={action} onNavigate={onClose} />
    case 'action':
      return (
        <ButtonActionItem
          action={{
            ...action,
            onClick: () => {
              onClose()
              action.onClick()
            }
          }}
        />
      )
    case 'modal':
      return (
        <ModalActionItem
          action={action}
          onOpen={() => {
            onClose()
            onModalOpen(action)
          }}
        />
      )
  }
}

export default TableRowActionItem
