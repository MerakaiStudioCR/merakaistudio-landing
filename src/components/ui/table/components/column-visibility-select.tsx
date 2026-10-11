import { useState } from 'react'
import { ChevronDown, RotateCcwIcon } from 'lucide-react'
import { cn } from '~/shared/lib/cn'
import Checkbox from '~/components/ui/form/checkbox'
import Button from '~/components/ui/button'

import useMessages from '~/i18n/useMessages'
import useTableColumnVisibility from '../hooks/useTableColumnVisibility'

const ColumnVisibilitySelect = () => {
  const t = useMessages('global')
  const { columns, toggleColumn, resetToDefaults, hasHiddenColumns } =
    useTableColumnVisibility()
  const [isOpen, setIsOpen] = useState(false)

  if (!hasHiddenColumns) {
    return null
  }

  const handleToggle = (columnId: string) => {
    toggleColumn(columnId)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleReset = () => {
    resetToDefaults()
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant='tertiary'
        onKeyDown={handleKeyDown}
      >
        {t('columns')}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type='button'
            tabIndex={-1}
            aria-label={t('close-filter')}
            className='fixed inset-0 z-10'
            onClick={() => {
              setIsOpen(false)
            }}
          />

          {/* Dropdown */}
          <div className='absolute top-full right-0 z-20 mt-1 w-48 rounded-md border border-border bg-background shadow-lg'>
            <div className='flex flex-col gap-2 p-2'>
              <Button
                variant='outline'
                onClick={handleReset}
                className='w-full bg-muted'
                onKeyDown={handleKeyDown}
              >
                {t('reset')}
                <RotateCcwIcon />
              </Button>

              <div className='space-y-1 border-border border-t pt-2'>
                {columns.map((column) => (
                  <div key={column.id} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`column-${column.id}`}
                      checked={column.visible}
                      onChange={() => handleToggle(column.id)}
                      onKeyDown={handleKeyDown}
                      label={column.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ColumnVisibilitySelect
