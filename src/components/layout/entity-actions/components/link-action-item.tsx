import Button from '~/components/ui/button'
import ActionContent from './action-content'
import { getBaseClassName } from '../lib/constants'
import type { LinkAction } from '../types'

type Props = {
  action: LinkAction
  onNavigate?: () => void
}

const LinkActionItem = ({ action, onNavigate }: Props) => (
  <Button
    asLink
    href={action.href}
    variant='white'
    className={getBaseClassName(!!action.icon)}
    onClick={onNavigate}
  >
    <ActionContent action={action} />
  </Button>
)

export default LinkActionItem
