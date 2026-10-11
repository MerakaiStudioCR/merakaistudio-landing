'use client'

import { createContext, useState, useCallback, useMemo, useEffect } from 'react'

interface SelectionContextValue {
  selectedItems: Set<string>
  toggleItem: (id: string) => void
  selectAll: (checked: boolean) => void
  isSelected: (id: string) => boolean
  selectedCount: number
  areAllSelected: boolean
}

const SelectionContext = createContext<SelectionContextValue | undefined>(
  undefined
)

interface ProviderProps {
  children: React.ReactNode
  items: { id: string }[]
  initialSelectedIds?: string[]
  onSelectionChange?: (selectedItems: Set<string>) => void
}

export const SelectionProvider = ({
  children,
  items,
  initialSelectedIds,
  onSelectionChange
}: ProviderProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(() => {
    if (!initialSelectedIds?.length) return new Set()
    const allowed = new Set(items.map((item) => item.id))
    return new Set(initialSelectedIds.filter((id) => allowed.has(id)))
  })

  const toggleItem = useCallback((id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const selectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedItems(new Set(items.map((item) => item.id)))
      } else {
        setSelectedItems(new Set())
      }
    },
    [items]
  )

  const isSelected = useCallback(
    (id: string) => selectedItems.has(id),
    [selectedItems]
  )

  const selectedCount = useMemo(() => selectedItems.size, [selectedItems])

  const areAllSelected = useMemo(() => {
    return items.length > 0 && selectedItems.size === items.length
  }, [items.length, selectedItems.size])

  const value: SelectionContextValue = {
    selectedItems,
    toggleItem,
    selectAll,
    isSelected,
    selectedCount,
    areAllSelected
  }

  useEffect(() => {
    onSelectionChange?.(selectedItems)
  }, [onSelectionChange, selectedItems])

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export default SelectionContext
