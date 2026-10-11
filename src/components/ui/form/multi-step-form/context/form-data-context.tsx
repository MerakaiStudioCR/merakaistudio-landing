import { createContext } from 'react'

export interface FormDataContextValue<T> {
  formData: T
  setFormData: React.Dispatch<React.SetStateAction<T>>
  validationErrors: Record<keyof T, string>
  validationFieldLabels?: Record<string, string>
  formRef: React.RefObject<HTMLFormElement | null>
  updateFormData: () => boolean
  persistCurrentStepWithoutValidation: () => void
  validateAllSteps: () => T | false
}

const FormDataContext =
  // biome-ignore lint/suspicious/noExplicitAny: The initial data is unknown
  createContext<FormDataContextValue<any> | null>(null)

export default FormDataContext
