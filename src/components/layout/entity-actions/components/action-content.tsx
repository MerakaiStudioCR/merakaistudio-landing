import type { EntityAction } from '../types'

type Props = {
  action: EntityAction
}

const ActionContent = ({ action }: Props) => (
  <>
    {action.icon && <action.icon className='size-5' />}
    {action.label}
  </>
)

export default ActionContent
