import Button from '~/components/ui/button'
import ActionContent from './action-content'
import { cn } from '~/shared/lib/cn'
import { destructiveStyles, getBaseClassName } from '../lib/constants'
import type { ModalAction } from '../types'

type Props = {
  action: ModalAction
  onOpen: () => void
}

const ModalActionItem = ({ action, onOpen }: Props) => (
  <Button
    variant='white'
    className={cn(
      getBaseClassName(!!action.icon),
      action.variant === 'destructive' && destructiveStyles
    )}
    onClick={onOpen}
  >
    <ActionContent action={action} />
  </Button>
)

export default ModalActionItem
