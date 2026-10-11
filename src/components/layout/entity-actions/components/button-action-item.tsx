import Button from '~/components/ui/button'
import ActionContent from './action-content'
import { cn } from '~/shared/lib/cn'
import { destructiveStyles, getBaseClassName } from '../lib/constants'
import type { ButtonAction } from '../types'

type Props = {
  action: ButtonAction
}

const ButtonActionItem = ({ action }: Props) => (
  <Button
    type='button'
    variant='white'
    disabled={action.disabled}
    className={cn(
      getBaseClassName(!!action.icon),
      action.variant === 'destructive' && destructiveStyles
    )}
    onClick={action.onClick}
  >
    <ActionContent action={action} />
  </Button>
)

export default ButtonActionItem
