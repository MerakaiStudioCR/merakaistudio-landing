import ButtonActionItem from './components/button-action-item'
import LinkActionItem from './components/link-action-item'
import ModalActionItem from './components/modal-action-item'
import type { EntityAction, ModalAction } from './types'

type Props = {
  action: EntityAction
  onModalOpen?: (action: ModalAction) => void
}

const ActionItem = ({ action, onModalOpen }: Props) => {
  switch (action.type) {
    case 'link':
      return <LinkActionItem action={action} />
    case 'action':
      return <ButtonActionItem action={action} />
    case 'modal':
      return (
        <ModalActionItem action={action} onOpen={() => onModalOpen?.(action)} />
      )
  }
}

export default ActionItem
