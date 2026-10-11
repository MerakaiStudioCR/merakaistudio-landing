'use client'

import Command from '~/components/ui/command'
import useComboboxContext from '../hooks/useComboboxContext'
import type { ComboboxItemProps } from '../types'

const ComboboxItem = <T = unknown>({
  option,
  children
}: ComboboxItemProps<T>) => {
  const { onSelect, setOpen, setSearchTerm } = useComboboxContext<T>()

  const handleSelect = () => {
    onSelect(String(option.value), option.label)
    setSearchTerm('')
    setOpen(false)
  }

  return (
    <Command.Item value={String(option.value)} onSelect={handleSelect}>
      {children || option.label}
    </Command.Item>
  )
}

export default ComboboxItem
