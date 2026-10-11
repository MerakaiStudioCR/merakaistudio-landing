import TableHeader from './table-header'
import Checkbox from '~/components/ui/form/checkbox/base-checkbox'
import useSelection from '~/shared/hooks/useSelection'
import selectionColumnClass from '../lib/selection-column-class'

interface SelectionHeaderProps {
  className?: string
}

const SelectionHeader = ({ className }: SelectionHeaderProps) => {
  const { areAllSelected, selectAll } = useSelection()

  return (
    <TableHeader className={selectionColumnClass}>
      <Checkbox
        checked={areAllSelected}
        onChange={(e) => selectAll(e.target.checked)}
        className={className}
      />
    </TableHeader>
  )
}

export default SelectionHeader
