'use client'

import { createContext, useContext } from 'react'

export interface FormDraftContextValue {
  persistKey?: string
  clearDraft: () => void
}

const FormDraftContext = createContext<FormDraftContextValue | null>(null)

export const useFormDraft = (): FormDraftContextValue => {
  const context = useContext(FormDraftContext)
  if (!context) {
    return {
      clearDraft: () => {}
    }
  }
  return context
}

export default FormDraftContext
