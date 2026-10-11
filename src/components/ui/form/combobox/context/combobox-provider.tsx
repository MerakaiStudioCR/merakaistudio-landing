'use client'

import { useState, useMemo, useCallback } from 'react'
import Popover from '~/components/ui/popover'
import ComboboxContext from './combobox-context'
import useComboboxData from '../hooks/useComboboxData'
import type { ComboboxContextValue, ComboboxOption } from '../types'

type Props<T = unknown> = {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, option?: ComboboxOption<T>) => void
  fetchOptions: (searchTerm: string) => Promise<ComboboxOption<T>[]>
  fetchInitialLabel?: (value: string) => Promise<string | undefined>
  name?: string
}

const ComboboxProvider = <T = unknown>({
  children,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  fetchOptions,
  fetchInitialLabel,
  name
}: Props<T>) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [userSelectedLabel, setUserSelectedLabel] = useState('')

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const { options, isLoading, initialLabel } = useComboboxData({
    value,
    searchTerm,
    fetchOptions,
    fetchInitialLabel,
    name
  })

  // Derive display label: user selection takes precedence, then fetched initial label
  const selectedLabel = userSelectedLabel || initialLabel || ''

  const onSelect = useCallback(
    (newValue: string, label: string) => {
      setUserSelectedLabel(label)
      setInternalValue(newValue)
      const option = options.find((o) => String(o.value) === newValue)
      onValueChange?.(newValue, option)
    },
    [options, onValueChange]
  )

  const contextValue = useMemo<ComboboxContextValue<T>>(
    () => ({
      value,
      selectedLabel,
      onSelect,
      setOpen,
      options,
      isLoading,
      searchTerm,
      setSearchTerm
    }),
    [value, selectedLabel, onSelect, options, isLoading, searchTerm]
  )

  return (
    <ComboboxContext.Provider value={contextValue}>
      {name && <input type='hidden' name={name} value={value} />}
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  )
}

export default ComboboxProvider
