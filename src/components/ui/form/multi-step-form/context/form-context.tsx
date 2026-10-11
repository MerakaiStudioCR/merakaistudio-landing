import { createContext } from 'react'

export interface MultiStepFormContextValue<T> {
  currentStep: number
  totalSteps: number
  formData: T
  setFormData: (data: T) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: number) => void
  isFirstStep: boolean
  isLastStep: boolean
  validationErrors: Record<keyof T, string>
  clearValidationErrors: () => void
  formRef: React.RefObject<HTMLFormElement | null>
}

const MultiStepFormContext =
  // biome-ignore lint/suspicious/noExplicitAny: The initial data is unknown
  createContext<MultiStepFormContextValue<any> | null>(null)

export default MultiStepFormContext
