'use client'

import { useContext } from 'react'
import ComboboxContext from '../context/combobox-context'
import type { ComboboxContextValue } from '../types'

const useComboboxContext = <T = unknown>() => {
  const context = useContext(ComboboxContext) as ComboboxContextValue<T> | null
  if (!context) {
    throw new Error('Combobox compound components must be used within Combobox')
  }
  return context
}

export default useComboboxContext
