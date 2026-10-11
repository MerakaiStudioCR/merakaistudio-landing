import TableCell from './table-cell'
import Checkbox from '~/components/ui/form/checkbox/base-checkbox'
import useSelection from '~/shared/hooks/useSelection'
import { cn } from '~/shared/lib/cn'
import selectionColumnClass from '../lib/selection-column-class'

interface SelectionCellProps {
  name: string
  itemId: string
  className?: string
  disabled?: boolean
}

const SelectionCell = ({
  name,
  itemId,
  className,
  disabled = false
}: SelectionCellProps) => {
  const { isSelected, toggleItem } = useSelection()

  return (
    <TableCell tableClassName={selectionColumnClass}>
      <Checkbox
        name={`${name}-${itemId}`}
        className={cn(className)}
        checked={isSelected(itemId)}
        disabled={disabled}
        onChange={() => {
          if (disabled) return
          toggleItem(itemId)
        }}
      />
    </TableCell>
  )
}

export default SelectionCell
