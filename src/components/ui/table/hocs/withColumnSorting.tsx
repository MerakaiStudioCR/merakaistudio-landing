import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import useMessages from '~/i18n/useMessages'

type Direction = 'asc' | 'desc'

type Props = React.ThHTMLAttributes<HTMLTableCellElement> & {
  children: React.ReactNode
  onSort?: (direction: Direction) => void
  initialDirection?: Direction
}

const withColumnSorting = (CellComponent: React.ComponentType<Props>) => {
  return ({ children, initialDirection, onSort, ...props }: Props) => {
    const t = useMessages('global')
    const [direction, setDirection] = useState<Direction>(
      initialDirection || 'desc'
    )

    const handleSort = () => {
      setDirection(direction === 'asc' ? 'desc' : 'asc')
      onSort?.(direction)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSort()
      }
    }

    return (
      <CellComponent
        className={
          onSort &&
          'cursor-pointer select-none transition-colors hover:bg-accent hover:text-accent-foreground'
        }
        onClick={onSort ? handleSort : undefined}
        onKeyDown={onSort ? handleKeyDown : undefined}
        tabIndex={onSort ? 0 : undefined}
        role={onSort ? 'button' : undefined}
        aria-label={
          onSort
            ? `${t(direction === 'asc' ? 'sort-asc' : 'sort-desc')}`
            : undefined
        }
        {...props}
      >
        <div className='flex items-center justify-center gap-2'>
          {children}
          {onSort && <ChevronsUpDown className='h-4 w-4' aria-hidden='true' />}
        </div>
      </CellComponent>
    )
  }
}

export default withColumnSorting
